---
sidebar_position: 4
---

# Structure Modding

## Giới thiệu

Structure Modding cho phép bạn tạo các cấu trúc tùy chỉnh với các thuộc tính, hành vi và hiệu ứng riêng. Tài liệu này sẽ hướng dẫn chi tiết cách tạo một structure hoàn chỉnh.

## Cấu trúc Cơ bản

### Khởi tạo Structure

```lua
local function MakeCustomStructure()
    local inst = CreateEntity()
    
    -- Thêm components cơ bản
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    inst.entity:AddDynamicShadow()
    inst.entity:AddMiniMapEntity()
    
    -- Thiết lập transform
    inst.Transform:SetScale(1, 1, 1)
    
    -- Thiết lập animation
    inst.AnimState:SetBank("custom_structure")
    inst.AnimState:SetBuild("custom_structure")
    inst.AnimState:PlayAnimation("idle")
    
    -- Thiết lập shadow
    inst.DynamicShadow:SetSize(2, 1)
    
    -- Thiết lập minimap
    inst.MiniMapEntity:SetIcon("custom_structure.tex")
    
    -- Thêm components tùy chỉnh
    inst:AddComponent("workable")
    inst:AddComponent("lootdropper")
    inst:AddComponent("inspectable")
    inst:AddComponent("named")
    inst:AddComponent("health")
    inst:AddComponent("combat")
    
    -- Thiết lập workable
    inst.components.workable:SetWorkAction(ACTIONS.HAMMER)
    inst.components.workable:SetWorkLeft(3)
    inst.components.workable:SetOnWorkFinished(function(inst, worker)
        inst.components.lootdropper:SpawnLootPrefab("custom_item")
        inst:Remove()
    end)
    
    -- Thiết lập lootdropper
    inst.components.lootdropper:SetLoot({"custom_item"})
    
    -- Thiết lập inspectable
    inst.components.inspectable:SetDescription(function(observer)
        return "A custom structure"
    end)
    
    -- Thiết lập named
    inst.components.named:SetName("Custom Structure")
    
    -- Thiết lập health
    inst.components.health:SetMaxHealth(100)
    
    -- Thiết lập combat
    inst.components.combat:SetDefaultDamage(0)
    inst.components.combat:SetRange(0)
    
    return inst
end
```

## Thuộc tính và Hành vi

### Thuộc tính Cơ bản

```lua
local function SetStructureStats(inst)
    -- Workable
    inst.components.workable:SetWorkAction(ACTIONS.HAMMER)
    inst.components.workable:SetWorkLeft(3)
    inst.components.workable:SetOnWorkFinished(function(inst, worker)
        inst.components.lootdropper:SpawnLootPrefab("custom_item")
        inst:Remove()
    end)
    
    -- Lootdropper
    inst.components.lootdropper:SetLoot({"custom_item"})
    inst.components.lootdropper:SetChanceLootTable("custom_structure")
    
    -- Inspectable
    inst.components.inspectable:SetDescription(function(observer)
        return "A custom structure"
    end)
    
    -- Named
    inst.components.named:SetName("Custom Structure")
    
    -- Health
    inst.components.health:SetMaxHealth(100)
    inst.components.health:SetRegenRate(1)
    
    -- Combat
    inst.components.combat:SetDefaultDamage(0)
    inst.components.combat:SetRange(0)
    inst.components.combat:SetOnHit(function(inst, attacker, damage)
        -- Xử lý khi bị tấn công
        inst:PushEvent("custom_structure_hit")
    end)
end
```

### Hành vi Đặc biệt

```lua
local function AddSpecialBehaviors(inst)
    -- Thêm component tùy chỉnh
    inst:AddComponent("custom_behavior")
    
    -- Định nghĩa các hành vi
    local behaviors = {
        -- Hành vi khi được xây dựng
        OnBuilt = function(inst, builder)
            -- Xử lý khi được xây dựng
            inst:PushEvent("custom_structure_built")
        end,
        
        -- Hành vi khi bị phá hủy
        OnDestroyed = function(inst)
            -- Xử lý khi bị phá hủy
            inst:PushEvent("custom_structure_destroyed")
        end,
        
        -- Hành vi khi được sử dụng
        OnUsed = function(inst, user)
            -- Xử lý khi được sử dụng
            inst:PushEvent("custom_structure_used")
        end
    }
    
    -- Thêm các hành vi vào component
    for name, behavior in pairs(behaviors) do
        inst.components.custom_behavior:AddBehavior(name, behavior)
    end
end
```

## Hiệu ứng và Animations

### Thiết lập Hiệu ứng

```lua
local function SetupStructureEffects(inst)
    -- Particle effects
    inst:AddComponent("particleemitter")
    inst.components.particleemitter:SetParticleName("custom_particles")
    inst.components.particleemitter:SetEmitRate(1)
    inst.components.particleemitter:SetScale(1)
    
    -- Trail effects
    inst:AddComponent("trail")
    inst.components.trail:SetTrailLength(5)
    inst.components.trail:SetTrailColor(1, 1, 1, 1)
    
    -- Glow effects
    inst:AddComponent("glow")
    inst.components.glow:SetGlowColor(1, 1, 1, 1)
    inst.components.glow:SetGlowIntensity(1)
    
    -- Light effects
    inst:AddComponent("light")
    inst.components.light:SetFalloff(0.7)
    inst.components.light:SetIntensity(.5)
    inst.components.light:SetRadius(0.5)
    inst.components.light:SetColour(0, 0, 0)
    inst.components.light:Enable(true)
end
```

### Thiết lập Animations

```lua
local function SetupStructureAnimations(inst)
    -- Định nghĩa animations
    local animations = {
        idle = "idle",
        build = "build",
        destroy = "destroy",
        use = "use"
    }
    
    -- Thiết lập animation bank và build
    inst.AnimState:SetBank("custom_structure")
    inst.AnimState:SetBuild("custom_structure")
    
    -- Thêm các animation handlers
    inst:ListenForEvent("custom_structure_built", function(inst)
        inst.AnimState:PlayAnimation(animations.build)
    end)
    
    inst:ListenForEvent("custom_structure_destroyed", function(inst)
        inst.AnimState:PlayAnimation(animations.destroy)
    end)
    
    inst:ListenForEvent("custom_structure_used", function(inst)
        inst.AnimState:PlayAnimation(animations.use)
    end)
end
```

## Networking và Đồng bộ

### Đồng bộ Trạng thái

```lua
local function SetupNetworking(inst)
    -- Định nghĩa các biến cần đồng bộ
    local function OnEntityReplicated(inst)
        inst.replica.CustomStructure = inst.replica.CustomStructure or {}
        
        -- Đồng bộ health
        inst.replica.CustomStructure:SetValue("health", inst.components.health:GetPercent())
        
        -- Đồng bộ work left
        inst.replica.CustomStructure:SetValue("work_left", inst.components.workable:GetWorkLeft())
    end
    
    -- Cập nhật dữ liệu
    function inst:UpdateStats()
        if self.replica.CustomStructure then
            self.replica.CustomStructure:SetValue("health", self.components.health:GetPercent())
            self.replica.CustomStructure:SetValue("work_left", self.components.workable:GetWorkLeft())
        end
    end
end
```

### RPC Calls

```lua
local function SetupRPCs(inst)
    -- Định nghĩa RPC types
    local RPC_TYPES = {
        USE_STRUCTURE = "use_structure",
        DESTROY_STRUCTURE = "destroy_structure",
        REPAIR_STRUCTURE = "repair_structure"
    }
    
    -- Gửi RPC
    function inst:UseStructure()
        self.Network:SendRPC(RPC_TYPES.USE_STRUCTURE)
    end
    
    -- Nhận RPC
    function inst:OnRPC(rpc_type, ...)
        if rpc_type == RPC_TYPES.USE_STRUCTURE then
            self:DoUseStructure()
        elseif rpc_type == RPC_TYPES.DESTROY_STRUCTURE then
            self:DoDestroyStructure()
        elseif rpc_type == RPC_TYPES.REPAIR_STRUCTURE then
            self:DoRepairStructure()
        end
    end
end
```

## Ví dụ Hoàn chỉnh

### Custom Structure với Tất cả Tính năng

```lua
local function CreateCompleteStructure()
    local inst = CreateEntity()
    
    -- Khởi tạo cơ bản
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    inst.entity:AddDynamicShadow()
    inst.entity:AddMiniMapEntity()
    
    -- Thiết lập transform và visuals
    inst.Transform:SetScale(1, 1, 1)
    inst.DynamicShadow:SetSize(2, 1)
    inst.MiniMapEntity:SetIcon("custom_structure.tex")
    
    -- Thêm components
    inst:AddComponent("workable")
    inst:AddComponent("lootdropper")
    inst:AddComponent("inspectable")
    inst:AddComponent("named")
    inst:AddComponent("health")
    inst:AddComponent("combat")
    inst:AddComponent("custom_behavior")
    inst:AddComponent("particleemitter")
    inst:AddComponent("trail")
    inst:AddComponent("glow")
    inst:AddComponent("light")
    
    -- Thiết lập stats
    SetStructureStats(inst)
    
    -- Thêm hành vi đặc biệt
    AddSpecialBehaviors(inst)
    
    -- Thiết lập hiệu ứng
    SetupStructureEffects(inst)
    
    -- Thiết lập animations
    SetupStructureAnimations(inst)
    
    -- Thiết lập networking
    SetupNetworking(inst)
    SetupRPCs(inst)
    
    return inst
end

-- Đăng ký prefab
local CustomStructure = MakePrefab(
    "custom_structure",
    {
        Asset("ANIM", "anim/custom_structure.zip"),
        Asset("ATLAS", "images/custom_structure.xml"),
        Asset("IMAGE", "images/custom_structure.tex"),
        Asset("SOUND", "sound/custom_structure.fsb")
    },
    CreateCompleteStructure
)

-- Thêm vào game
mod:AddPrefab("custom_structure", CustomStructure)
```

## Best Practices

### 1. Tổ chức Code
- Tách biệt logic thành các hàm riêng biệt
- Sử dụng constants cho các giá trị cố định
- Thêm comments để giải thích logic phức tạp

### 2. Performance
- Tối ưu hóa số lượng components
- Sử dụng caching cho các giá trị thường xuyên truy cập
- Tránh tạo garbage trong các vòng lặp

### 3. Networking
- Chỉ đồng bộ các dữ liệu cần thiết
- Sử dụng RPC cho các hành động quan trọng
- Validate dữ liệu trước khi xử lý

### 4. Testing
- Test các chức năng cơ bản
- Kiểm tra tính ổn định
- Debug các vấn đề phát sinh 