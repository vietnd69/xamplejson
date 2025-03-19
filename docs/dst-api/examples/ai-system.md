---
sidebar_position: 5
---

# Hệ Thống AI

## Cơ Bản Về AI

### Tạo AI Entity
```lua
local function CreateAIEntity()
    local inst = CreateEntity()
    
    -- Thêm components cần thiết
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    
    -- Thêm AI components
    inst:AddComponent("locomotor")
    inst:AddComponent("combat")
    inst:AddComponent("health")
    inst:AddComponent("inventory")
    
    -- Thiết lập AI
    inst:SetBrain(require("brains/custom_brain"))
    inst:SetStateGraph("SGcustom_mob")
    
    return inst
end
```

### Tạo Brain
```lua
local CustomBrain = Class(Brain, function(self, inst)
    Brain._ctor(self, inst)
end)

function CustomBrain:OnStart()
    local root = PriorityNode({
        -- Kiểm tra trạng thái
        WhileNode(function() return self.inst.components.health:IsDead() end,
            "Dead", ActionNode(function() self.inst:Remove() end)),
        
        -- Chiến đấu
        WhileNode(function() return self.inst.components.combat:HasTarget() end,
            "HasTarget", ChaseAndAttack(self.inst, MAX_CHASE_TIME, MAX_CHASE_DIST)),
        
        -- Tìm thức ăn
        WhileNode(function() return self.inst.components.hunger:GetPercent() < 0.5 end,
            "IsHungry", ActionNode(function() self.inst:PushEvent("findfood") end)),
        
        -- Tìm ánh sáng
        WhileNode(function() return self.inst.components.sanity:GetPercent() < 0.5 end,
            "IsInsane", ActionNode(function() self.inst:PushEvent("findlight") end)),
        
        -- Di chuyển ngẫu nhiên
        ActionNode(function() self.inst:PushEvent("wander") end)
    }, 0.25)
    
    self.bt = BT(self.inst, root)
end
```

## Behavior Tree

### Tạo Behavior Tree
```lua
local function CreateBehaviorTree()
    local root = PriorityNode({
        -- Sequence node
        SequenceNode({
            -- Kiểm tra điều kiện
            WhileNode(function() return self.inst.components.health:GetPercent() > 0.5 end,
                "Healthy", ActionNode(function() self.inst:PushEvent("attack") end)),
            
            -- Thực hiện hành động
            ActionNode(function() self.inst:PushEvent("heal") end)
        }),
        
        -- Selector node
        SelectorNode({
            -- Tìm thức ăn
            WhileNode(function() return self.inst.components.hunger:GetPercent() < 0.3 end,
                "VeryHungry", ActionNode(function() self.inst:PushEvent("findfood") end)),
            
            -- Tìm nơi trú ẩn
            WhileNode(function() return self.inst.components.sanity:GetPercent() < 0.3 end,
                "VeryInsane", ActionNode(function() self.inst:PushEvent("findshelter") end))
        })
    }, 0.25)
    
    return root
end
```

### Custom Actions
```lua
local CustomActions = {
    -- Hành động tìm thức ăn
    FindFood = ActionNode(function(inst)
        local food = FindEntity(inst, 20, function(item)
            return item.components.edible ~= nil
        end)
        
        if food then
            inst:PushEvent("gotofood", {target = food})
        end
    end),
    
    -- Hành động tìm nơi trú ẩn
    FindShelter = ActionNode(function(inst)
        local shelter = FindEntity(inst, 30, function(item)
            return item.components.shelter ~= nil
        end)
        
        if shelter then
            inst:PushEvent("gotoshelter", {target = shelter})
        end
    end)
}
```

## State Graph

### Tạo State Graph
```lua
local states = {
    State{
        name = "idle",
        onenter = function(inst)
            inst.AnimState:PlayAnimation("idle")
        end,
        
        events = {
            EventHandler("animover", function(inst)
                inst.sg:GoToState("wander")
            end)
        }
    },
    
    State{
        name = "wander",
        onenter = function(inst)
            inst.AnimState:PlayAnimation("walk")
            inst.components.locomotor:WalkForward()
        end,
        
        events = {
            EventHandler("animover", function(inst)
                inst.sg:GoToState("idle")
            end)
        }
    },
    
    State{
        name = "attack",
        onenter = function(inst)
            inst.AnimState:PlayAnimation("attack")
        end,
        
        events = {
            EventHandler("animover", function(inst)
                inst.sg:GoToState("idle")
            end)
        }
    }
}

local events = {
    EventHandler("attacked", function(inst, data)
        inst.sg:GoToState("attack")
    end)
}

return StateGraph("custom_mob", states, events, "idle")
```

## Best Practices

1. Tổ chức behavior tree rõ ràng và logic
2. Sử dụng các node phù hợp cho từng hành động
3. Tối ưu hóa performance của AI
4. Thêm comments để giải thích logic
5. Test AI trong nhiều tình huống khác nhau
6. Xử lý các trường hợp đặc biệt
7. Cân bằng độ khó của AI
8. Thêm debug logs khi cần thiết
9. Tối ưu hóa số lượng states
10. Sử dụng events để giao tiếp giữa các components 