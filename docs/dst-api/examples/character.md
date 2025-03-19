---
sidebar_position: 2
---

# Character Modding

## Giới thiệu

Character Modding cho phép bạn tạo các nhân vật tùy chỉnh với các thuộc tính, khả năng và hành vi riêng. Tài liệu này sẽ hướng dẫn chi tiết cách tạo một character hoàn chỉnh.

## Cấu trúc Cơ bản

### Khởi tạo Character

```lua
local function MakeCustomCharacter()
    local inst = CreateEntity()
    
    -- Thêm components cơ bản
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    inst.entity:AddDynamicShadow()
    inst.entity:AddLight()
    
    -- Thiết lập transform
    inst.Transform:SetScale(1, 1, 1)
    
    -- Thiết lập animation
    inst.AnimState:SetBank("custom_character")
    inst.AnimState:SetBuild("custom_character")
    inst.AnimState:PlayAnimation("idle")
    
    -- Thiết lập shadow
    inst.DynamicShadow:SetSize(1.3, 0.6)
    
    -- Thiết lập light
    inst.Light:SetFalloff(0.7)
    inst.Light:SetIntensity(.5)
    inst.Light:SetRadius(0.5)
    inst.Light:SetColour(0, 0, 0)
    inst.Light:Enable(true)
    
    -- Thêm components tùy chỉnh
    inst:AddComponent("health")
    inst:AddComponent("hunger")
    inst:AddComponent("sanity")
    inst:AddComponent("combat")
    inst:AddComponent("inventory")
    inst:AddComponent("builder")
    inst:AddComponent("eater")
    inst:AddComponent("playercontroller")
    
    -- Thiết lập các thuộc tính
    inst.components.health:SetMaxHealth(150)
    inst.components.hunger:SetMax(150)
    inst.components.sanity:SetMax(150)
    
    -- Thiết lập combat
    inst.components.combat:SetDefaultDamage(20)
    inst.components.combat:SetAttackPeriod(1)
    inst.components.combat:SetRange(2)
    
    -- Thiết lập inventory
    inst.components.inventory:SetMaxSlots(15)
    
    -- Thiết lập builder
    inst.components.builder:SetBuilderLevel(1)
    
    -- Thiết lập eater
    inst.components.eater:SetDiet({ FOODTYPE.MEAT, FOODTYPE.VEGGIE })
    
    -- Thiết lập playercontroller
    inst.components.playercontroller:SetCanUseMap(true)
    inst.components.playercontroller:SetCanUseInventory(true)
    
    return inst
end
```

## Thuộc tính và Khả năng

### Thuộc tính Cơ bản

```lua
local function SetCharacterStats(inst)
    -- Health
    inst.components.health:SetMaxHealth(150)
    inst.components.health:SetRegenRate(1)
    
    -- Hunger
    inst.components.hunger:SetMax(150)
    inst.components.hunger:SetRate(1)
    
    -- Sanity
    inst.components.sanity:SetMax(150)
    inst.components.sanity:SetRate(1)
    
    -- Combat
    inst.components.combat:SetDefaultDamage(20)
    inst.components.combat:SetAttackPeriod(1)
    inst.components.combat:SetRange(2)
    
    -- Inventory
    inst.components.inventory:SetMaxSlots(15)
    
    -- Movement
    inst.components.locomotor:SetRunSpeed(6)
    inst.components.locomotor:SetWalkSpeed(4)
end
```

### Khả năng Đặc biệt

```lua
local function AddSpecialAbilities(inst)
    -- Khả năng bay
    inst:AddComponent("flyer")
    inst.components.flyer:SetMaxSpeed(8)
    inst.components.flyer:SetMinSpeed(4)
    
    -- Khả năng biến hình
    inst:AddComponent("shapechanger")
    inst.components.shapechanger:SetTransformTime(1)
    
    -- Khả năng hồi phục
    inst:AddComponent("healer")
    inst.components.healer:SetHealAmount(10)
    inst.components.healer:SetHealPeriod(5)
end
```

## Animations và Visuals

### Thiết lập Animations

```lua
local function SetupCharacterAnimations(inst)
    -- Định nghĩa animations
    local animations = {
        idle = "idle",
        run = "run",
        walk = "walk",
        attack = "attack",
        eat = "eat",
        sleep = "sleep"
    }
    
    -- Thiết lập animation bank và build
    inst.AnimState:SetBank("custom_character")
    inst.AnimState:SetBuild("custom_character")
    
    -- Thêm các animation handlers
    inst:ListenForEvent("locomote", function(inst, data)
        if data.locomotion == "run" then
            inst.AnimState:PlayAnimation(animations.run)
        elseif data.locomotion == "walk" then
            inst.AnimState:PlayAnimation(animations.walk)
        else
            inst.AnimState:PlayAnimation(animations.idle)
        end
    end)
    
    -- Attack animation
    inst:ListenForEvent("combat", function(inst, data)
        if data.action == "attack" then
            inst.AnimState:PlayAnimation(animations.attack)
        end
    end)
end
```

### Visual Effects

```lua
local function SetupVisualEffects(inst)
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
end
```

## Hành vi và AI

### Custom Behaviors

```lua
local function AddCustomBehaviors(inst)
    -- Thêm brain
    inst:AddComponent("brain")
    
    -- Định nghĩa các hành vi
    local behaviors = {
        -- Hành vi tìm kiếm thức ăn
        FindFood = function(inst)
            local food = FindEntity(inst, 20, function(item)
                return item.components.edible ~= nil
            end)
            if food then
                inst:PushEvent("gotofood", food)
            end
        end,
        
        -- Hành vi tấn công
        Attack = function(inst)
            local target = FindEntity(inst, 10, function(item)
                return item.components.combat ~= nil
            end)
            if target then
                inst:PushEvent("attack", target)
            end
        end
    }
    
    -- Thêm các hành vi vào brain
    for name, behavior in pairs(behaviors) do
        inst.components.brain:AddBehavior(name, behavior)
    end
end
```

### AI Decision Making

```lua
local function SetupAIDecisionMaking(inst)
    -- Thêm decision maker
    inst:AddComponent("decisionmaker")
    
    -- Định nghĩa các quyết định
    local decisions = {
        -- Quyết định tìm thức ăn
        FindFood = function(inst)
            if inst.components.hunger:GetPercent() < 0.5 then
                return true
            end
            return false
        end,
        
        -- Quyết định tấn công
        Attack = function(inst)
            if inst.components.combat:CanAttack() then
                return true
            end
            return false
        end
    }
    
    -- Thêm các quyết định vào decision maker
    for name, decision in pairs(decisions) do
        inst.components.decisionmaker:AddDecision(name, decision)
    end
end
```

## Networking và Đồng bộ

### Đồng bộ Trạng thái

```lua
local function SetupNetworking(inst)
    -- Định nghĩa các biến cần đồng bộ
    local function OnEntityReplicated(inst)
        inst.replica.CustomCharacter = inst.replica.CustomCharacter or {}
        
        -- Đồng bộ health
        inst.replica.CustomCharacter:SetValue("health", inst.components.health:GetPercent())
        
        -- Đồng bộ hunger
        inst.replica.CustomCharacter:SetValue("hunger", inst.components.hunger:GetPercent())
        
        -- Đồng bộ sanity
        inst.replica.CustomCharacter:SetValue("sanity", inst.components.sanity:GetPercent())
    end
    
    -- Cập nhật dữ liệu
    function inst:UpdateStats()
        if self.replica.CustomCharacter then
            self.replica.CustomCharacter:SetValue("health", self.components.health:GetPercent())
            self.replica.CustomCharacter:SetValue("hunger", self.components.hunger:GetPercent())
            self.replica.CustomCharacter:SetValue("sanity", self.components.sanity:GetPercent())
        end
    end
end
```

### RPC Calls

```lua
local function SetupRPCs(inst)
    -- Định nghĩa RPC types
    local RPC_TYPES = {
        USE_ABILITY = "use_ability",
        TRANSFORM = "transform",
        HEAL = "heal"
    }
    
    -- Gửi RPC
    function inst:UseAbility(ability_name)
        self.Network:SendRPC(RPC_TYPES.USE_ABILITY, ability_name)
    end
    
    -- Nhận RPC
    function inst:OnRPC(rpc_type, ...)
        if rpc_type == RPC_TYPES.USE_ABILITY then
            local ability_name = ...
            self:DoUseAbility(ability_name)
        elseif rpc_type == RPC_TYPES.TRANSFORM then
            self:DoTransform()
        elseif rpc_type == RPC_TYPES.HEAL then
            self:DoHeal()
        end
    end
end
```

## Ví dụ Hoàn chỉnh

### Custom Character với Tất cả Tính năng

```lua
local function CreateCompleteCharacter()
    local inst = CreateEntity()
    
    -- Khởi tạo cơ bản
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    inst.entity:AddDynamicShadow()
    inst.entity:AddLight()
    
    -- Thiết lập transform và visuals
    inst.Transform:SetScale(1, 1, 1)
    inst.DynamicShadow:SetSize(1.3, 0.6)
    inst.Light:SetFalloff(0.7)
    inst.Light:SetIntensity(.5)
    inst.Light:SetRadius(0.5)
    inst.Light:SetColour(0, 0, 0)
    inst.Light:Enable(true)
    
    -- Thêm components
    inst:AddComponent("health")
    inst:AddComponent("hunger")
    inst:AddComponent("sanity")
    inst:AddComponent("combat")
    inst:AddComponent("inventory")
    inst:AddComponent("builder")
    inst:AddComponent("eater")
    inst:AddComponent("playercontroller")
    inst:AddComponent("locomotor")
    inst:AddComponent("flyer")
    inst:AddComponent("shapechanger")
    inst:AddComponent("healer")
    inst:AddComponent("brain")
    inst:AddComponent("decisionmaker")
    inst:AddComponent("particleemitter")
    inst:AddComponent("trail")
    inst:AddComponent("glow")
    
    -- Thiết lập stats
    SetCharacterStats(inst)
    
    -- Thêm khả năng đặc biệt
    AddSpecialAbilities(inst)
    
    -- Thiết lập animations
    SetupCharacterAnimations(inst)
    
    -- Thiết lập visual effects
    SetupVisualEffects(inst)
    
    -- Thêm custom behaviors
    AddCustomBehaviors(inst)
    
    -- Thiết lập AI
    SetupAIDecisionMaking(inst)
    
    -- Thiết lập networking
    SetupNetworking(inst)
    SetupRPCs(inst)
    
    return inst
end

-- Đăng ký prefab
local CustomCharacter = MakePrefab(
    "custom_character",
    {
        Asset("ANIM", "anim/custom_character.zip"),
        Asset("ATLAS", "images/custom_character.xml"),
        Asset("IMAGE", "images/custom_character.tex"),
        Asset("SOUND", "sound/custom_character.fsb")
    },
    CreateCompleteCharacter
)

-- Thêm vào game
mod:AddPrefab("custom_character", CustomCharacter)
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