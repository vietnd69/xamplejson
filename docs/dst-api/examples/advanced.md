---
sidebar_position: 2
---

# Ví Dụ Nâng Cao

## World Generation

### Tạo Biome Tùy Chỉnh
```lua
local function CreateCustomBiome()
    local biome = {
        name = "custom_biome",
        ground = {
            GROUND.GRASS,
            GROUND.FOREST,
            GROUND.MARSH
        },
        vegetation = {
            "grass",
            "sapling",
            "reeds"
        },
        structures = {
            "custom_structure",
            "custom_chest"
        },
        prefabs = {
            "custom_mob"
        },
        background = "custom_background",
        background_color = {0.5, 0.5, 0.5, 1}
    }
    
    AddBiome(biome)
end
```

### Tạo Room Tùy Chỉnh
```lua
local function CreateCustomRoom()
    local room = {
        name = "custom_room",
        contents = {
            countprefabs = {
                grass = 15,
                sapling = 8,
                reeds = 5
            },
            distributeprefabs = {
                custom_structure = 0.2,
                custom_chest = 0.1
            },
            prefabs = {
                custom_mob = 1
            }
        },
        edges = {
            "custom_biome"
        },
        background = "custom_background",
        background_color = {0.5, 0.5, 0.5, 1}
    }
    
    AddRoom(room)
end
```

## Networking

### RPC System
```lua
-- Định nghĩa RPC types
local RPC_TYPES = {
    USE_ITEM = "use_item",
    CRAFT_ITEM = "craft_item",
    INTERACT = "interact"
}

-- Component với RPC
local CustomComponent = Class(function(self, inst)
    self.inst = inst
    self.value = 0
    
    -- Đăng ký RPC handlers
    if not TheNet:IsDedicated() then
        inst:ListenForEvent("custom_rpc", function(inst, data)
            self:HandleRPC(data)
        end)
    end
end)

-- Gửi RPC
function CustomComponent:SendRPC(rpc_type, data)
    if TheNet:IsDedicated() then
        self.inst.Network:SendRPC(rpc_type, data)
    end
end

-- Xử lý RPC
function CustomComponent:HandleRPC(data)
    if data.type == RPC_TYPES.USE_ITEM then
        self:UseItem(data.item)
    elseif data.type == RPC_TYPES.CRAFT_ITEM then
        self:CraftItem(data.recipe)
    elseif data.type == RPC_TYPES.INTERACT then
        self:Interact(data.target)
    end
end
```

### Đồng Bộ Dữ Liệu
```lua
-- Component với đồng bộ dữ liệu
local SyncComponent = Class(function(self, inst)
    self.inst = inst
    self.value = 0
    
    -- Đăng ký network variables
    if TheNet:IsDedicated() then
        self.inst.Network:SetFloat("value", self.value)
    end
    
    -- Lắng nghe thay đổi
    if not TheNet:IsDedicated() then
        self.inst:ListenForEvent("value_dirty", function(inst)
            self:OnValueChanged()
        end)
    end
end)

-- Cập nhật giá trị
function SyncComponent:SetValue(value)
    self.value = value
    if TheNet:IsDedicated() then
        self.inst.Network:SetFloat("value", value)
    end
end

-- Xử lý thay đổi
function SyncComponent:OnValueChanged()
    local value = self.inst.Network:GetFloat("value")
    self:UpdateVisuals(value)
end
```

## AI System

### Tạo AI Behavior
```lua
local function CreateCustomAI()
    local brain = require("brains/custom_brain")
    
    local function fn()
        local inst = CreateEntity()
        
        -- Thêm components
        inst.entity:AddTransform()
        inst.entity:AddAnimState()
        inst.entity:AddNetwork()
        
        -- Thêm AI
        inst:AddComponent("locomotor")
        inst:AddComponent("combat")
        inst:AddComponent("health")
        inst:AddComponent("inventory")
        
        -- Thiết lập AI
        inst:SetBrain(brain)
        inst:SetStateGraph("SGcustom_mob")
        
        return inst
    end
    
    return fn
end
```

### Tạo Brain
```lua
local CustomBrain = Class(Brain, function(self, inst)
    Brain._ctor(self, inst)
end)

function CustomBrain:OnStart()
    local root = PriorityNode({
        WhileNode(function() return self.inst.components.health:IsDead() end,
            "Dead", ActionNode(function() self.inst:Remove() end)),
        
        WhileNode(function() return self.inst.components.combat:HasTarget() end,
            "HasTarget", ChaseAndAttack(self.inst, MAX_CHASE_TIME, MAX_CHASE_DIST)),
        
        WhileNode(function() return self.inst.components.hunger:GetPercent() < 0.5 end,
            "IsHungry", ActionNode(function() self.inst:PushEvent("findfood") end)),
        
        WhileNode(function() return self.inst.components.sanity:GetPercent() < 0.5 end,
            "IsInsane", ActionNode(function() self.inst:PushEvent("findlight") end)),
        
        ActionNode(function() self.inst:PushEvent("wander") end)
    }, 0.25)
    
    self.bt = BT(self.inst, root)
end
```

## UI System

### Tạo Custom Screen
```lua
local CustomScreen = Class(Screen, function(self)
    Screen._ctor(self)
end)

function CustomScreen:OnCreate()
    self.root = self:AddChild(Widget("ROOT"))
    self.root:SetVAnchor(ANCHOR_MIDDLE)
    self.root:SetHAnchor(ANCHOR_MIDDLE)
    self.root:SetScaleMode(SCALEMODE_PROPORTIONAL)
    self.root:SetMaxPropUpscale(MAX_HUD_SCALE)
    self.root:SetPosition(0, 0, 0)
    
    -- Thêm các elements
    self.title = self.root:AddChild(Text(BUTTONFONT, 30))
    self.title:SetPosition(0, 100, 0)
    self.title:SetString("Custom Screen")
    
    self.button = self.root:AddChild(ImageButton())
    self.button:SetPosition(0, 0, 0)
    self.button:SetNormal("images/button_normal.tex")
    self.button:SetHover("images/button_hover.tex")
    self.button:SetPressed("images/button_pressed.tex")
    self.button:SetOnClick(function()
        self:OnButtonClick()
    end)
end

function CustomScreen:OnButtonClick()
    -- Xử lý click
    print("Button clicked!")
end
```

## Best Practices

1. Tối ưu hóa world generation để tránh lag
2. Xử lý networking một cách an toàn và hiệu quả
3. Tạo AI behavior phù hợp với gameplay
4. Thiết kế UI thân thiện với người dùng
5. Thêm comments và documentation đầy đủ 