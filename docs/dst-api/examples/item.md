---
sidebar_position: 3
---

# Item Modding

## Giới thiệu

Item Modding cho phép bạn tạo các vật phẩm tùy chỉnh với các thuộc tính, hành vi và hiệu ứng riêng. Tài liệu này sẽ hướng dẫn chi tiết cách tạo một item hoàn chỉnh.

## Cấu trúc Cơ bản

### Khởi tạo Item

```lua
local function MakeCustomItem()
    local inst = CreateEntity()
    
    -- Thêm components cơ bản
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    inst.entity:AddDynamicShadow()
    
    -- Thiết lập transform
    inst.Transform:SetScale(1, 1, 1)
    
    -- Thiết lập animation
    inst.AnimState:SetBank("custom_item")
    inst.AnimState:SetBuild("custom_item")
    inst.AnimState:PlayAnimation("idle")
    
    -- Thiết lập shadow
    inst.DynamicShadow:SetSize(0.6, 0.6)
    
    -- Thêm components tùy chỉnh
    inst:AddComponent("inventoryitem")
    inst:AddComponent("stackable")
    inst:AddComponent("edible")
    inst:AddComponent("equippable")
    inst:AddComponent("perishable")
    inst:AddComponent("fuel")
    
    -- Thiết lập inventory item
    inst.components.inventoryitem.imagename = "custom_item"
    inst.components.inventoryitem.atlasname = "images/custom_item.xml"
    
    -- Thiết lập stackable
    inst.components.stackable.maxsize = 40
    
    -- Thiết lập edible
    inst.components.edible.healthvalue = 10
    inst.components.edible.hungervalue = 15
    inst.components.edible.sanityvalue = 5
    
    -- Thiết lập equippable
    inst.components.equippable:SetOnEquip(function(owner)
        owner.AnimState:OverrideSymbol("swap_object", "custom_item", "swap_object")
    end)
    
    inst.components.equippable:SetOnUnequip(function(owner)
        owner.AnimState:ClearOverrideSymbol("swap_object")
    end)
    
    -- Thiết lập perishable
    inst.components.perishable:SetPerishTime(10 * TUNING.TOTAL_DAY_TIME)
    inst.components.perishable:StartPerishing()
    
    -- Thiết lập fuel
    inst.components.fuel.fuelvalue = TUNING.MED_FUEL
    
    return inst
end
```

## Thuộc tính và Hành vi

### Thuộc tính Cơ bản

```lua
local function SetItemStats(inst)
    -- Inventory
    inst.components.inventoryitem:SetCanBeTaken(true)
    inst.components.inventoryitem:SetCanBeDropped(true)
    inst.components.inventoryitem:SetCanBePutInContainer(true)
    
    -- Stackable
    inst.components.stackable:SetMaxSize(40)
    inst.components.stackable:SetStackSize(1)
    
    -- Edible
    inst.components.edible:SetOnEaten(function(owner)
        -- Xử lý khi ăn
        owner:PushEvent("custom_item_eaten")
    end)
    
    -- Equippable
    inst.components.equippable:SetOnEquip(function(owner)
        -- Xử lý khi trang bị
        owner:PushEvent("custom_item_equipped")
    end)
    
    -- Perishable
    inst.components.perishable:SetPerishTime(10 * TUNING.TOTAL_DAY_TIME)
    inst.components.perishable:StartPerishing()
    
    -- Fuel
    inst.components.fuel:SetOnTaken(function(owner)
        -- Xử lý khi sử dụng làm nhiên liệu
        owner:PushEvent("custom_item_fueled")
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
        -- Hành vi khi sử dụng
        OnUse = function(inst, doer, target, actions, right)
            if right then
                -- Xử lý khi click chuột phải
                doer:PushEvent("custom_item_used")
            end
        end,
        
        -- Hành vi khi va chạm
        OnCollide = function(inst, other)
            -- Xử lý khi va chạm
            inst:PushEvent("custom_item_collided")
        end,
        
        -- Hành vi khi rơi
        OnDropped = function(inst)
            -- Xử lý khi rơi
            inst:PushEvent("custom_item_dropped")
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
local function SetupItemEffects(inst)
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
local function SetupItemAnimations(inst)
    -- Định nghĩa animations
    local animations = {
        idle = "idle",
        use = "use",
        drop = "drop",
        pick = "pick"
    }
    
    -- Thiết lập animation bank và build
    inst.AnimState:SetBank("custom_item")
    inst.AnimState:SetBuild("custom_item")
    
    -- Thêm các animation handlers
    inst:ListenForEvent("custom_item_used", function(inst)
        inst.AnimState:PlayAnimation(animations.use)
    end)
    
    inst:ListenForEvent("custom_item_dropped", function(inst)
        inst.AnimState:PlayAnimation(animations.drop)
    end)
    
    inst:ListenForEvent("custom_item_picked", function(inst)
        inst.AnimState:PlayAnimation(animations.pick)
    end)
end
```

## Networking và Đồng bộ

### Đồng bộ Trạng thái

```lua
local function SetupNetworking(inst)
    -- Định nghĩa các biến cần đồng bộ
    local function OnEntityReplicated(inst)
        inst.replica.CustomItem = inst.replica.CustomItem or {}
        
        -- Đồng bộ stack size
        inst.replica.CustomItem:SetValue("stack_size", inst.components.stackable:StackSize())
        
        -- Đồng bộ perish time
        inst.replica.CustomItem:SetValue("perish_time", inst.components.perishable:GetPerishTime())
    end
    
    -- Cập nhật dữ liệu
    function inst:UpdateStats()
        if self.replica.CustomItem then
            self.replica.CustomItem:SetValue("stack_size", self.components.stackable:StackSize())
            self.replica.CustomItem:SetValue("perish_time", self.components.perishable:GetPerishTime())
        end
    end
end
```

### RPC Calls

```lua
local function SetupRPCs(inst)
    -- Định nghĩa RPC types
    local RPC_TYPES = {
        USE_ITEM = "use_item",
        DROP_ITEM = "drop_item",
        STACK_ITEM = "stack_item"
    }
    
    -- Gửi RPC
    function inst:UseItem()
        self.Network:SendRPC(RPC_TYPES.USE_ITEM)
    end
    
    -- Nhận RPC
    function inst:OnRPC(rpc_type, ...)
        if rpc_type == RPC_TYPES.USE_ITEM then
            self:DoUseItem()
        elseif rpc_type == RPC_TYPES.DROP_ITEM then
            self:DoDropItem()
        elseif rpc_type == RPC_TYPES.STACK_ITEM then
            self:DoStackItem()
        end
    end
end
```

## Ví dụ Hoàn chỉnh

### Custom Item với Tất cả Tính năng

```lua
local function CreateCompleteItem()
    local inst = CreateEntity()
    
    -- Khởi tạo cơ bản
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    inst.entity:AddDynamicShadow()
    
    -- Thiết lập transform và visuals
    inst.Transform:SetScale(1, 1, 1)
    inst.DynamicShadow:SetSize(0.6, 0.6)
    
    -- Thêm components
    inst:AddComponent("inventoryitem")
    inst:AddComponent("stackable")
    inst:AddComponent("edible")
    inst:AddComponent("equippable")
    inst:AddComponent("perishable")
    inst:AddComponent("fuel")
    inst:AddComponent("custom_behavior")
    inst:AddComponent("particleemitter")
    inst:AddComponent("trail")
    inst:AddComponent("glow")
    inst:AddComponent("light")
    
    -- Thiết lập stats
    SetItemStats(inst)
    
    -- Thêm hành vi đặc biệt
    AddSpecialBehaviors(inst)
    
    -- Thiết lập hiệu ứng
    SetupItemEffects(inst)
    
    -- Thiết lập animations
    SetupItemAnimations(inst)
    
    -- Thiết lập networking
    SetupNetworking(inst)
    SetupRPCs(inst)
    
    return inst
end

-- Đăng ký prefab
local CustomItem = MakePrefab(
    "custom_item",
    {
        Asset("ANIM", "anim/custom_item.zip"),
        Asset("ATLAS", "images/custom_item.xml"),
        Asset("IMAGE", "images/custom_item.tex"),
        Asset("SOUND", "sound/custom_item.fsb")
    },
    CreateCompleteItem
)

-- Thêm vào game
mod:AddPrefab("custom_item", CustomItem)
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