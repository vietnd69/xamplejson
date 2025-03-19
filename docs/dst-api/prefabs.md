---
sidebar_position: 4
---

# Prefabs

## Giới thiệu

Prefabs là các template cho các entity trong game. Chúng định nghĩa cách một entity được tạo ra, bao gồm các thuộc tính, components, animations và các hành vi của nó.

## Tạo Prefab

### Cấu trúc cơ bản

```lua
local function MakePrefab(name, assets, prefab_fn)
    local prefab = {
        name = name,
        assets = assets,
        prefab = prefab_fn
    }
    return prefab
end

-- Ví dụ
local MyPrefab = MakePrefab(
    "my_item",
    {
        Asset("ANIM", "anim/my_item.zip"),
        Asset("ATLAS", "images/my_item.xml")
    },
    function()
        local inst = CreateEntity()
        -- Thiết lập các thuộc tính
        return inst
    end
)
```

### Assets

Assets là các tài nguyên cần thiết cho prefab.

```lua
local assets = {
    -- Animations
    Asset("ANIM", "anim/my_item.zip"),
    Asset("ANIM", "anim/my_item_build.zip"),
    
    -- Images
    Asset("ATLAS", "images/my_item.xml"),
    Asset("IMAGE", "images/my_item.tex"),
    
    -- Sounds
    Asset("SOUND", "sound/my_item.fsb"),
    
    -- Shaders
    Asset("SHADER", "shaders/my_item.ksh")
}
```

### Prefab Function

```lua
local function MakeMyPrefab()
    local inst = CreateEntity()
    
    -- Thêm các components
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    
    -- Thiết lập các thuộc tính
    inst.Transform:SetScale(1, 1, 1)
    inst.AnimState:SetBank("my_item")
    inst.AnimState:SetBuild("my_item")
    
    -- Thêm các components tùy chỉnh
    inst:AddComponent("inventoryitem")
    inst:AddComponent("stackable")
    
    -- Thiết lập các thuộc tính của components
    inst.components.inventoryitem.imagename = "my_item"
    inst.components.stackable.maxsize = 40
    
    return inst
end
```

## Components

### Transform Component
Quản lý vị trí và kích thước của entity.

```lua
inst.entity:AddTransform()
inst.Transform:SetPosition(x, y, z)
inst.Transform:SetScale(sx, sy, sz)
inst.Transform:SetRotation(rx, ry, rz)
```

### AnimState Component
Quản lý animations của entity.

```lua
inst.entity:AddAnimState()
inst.AnimState:SetBank("bank_name")
inst.AnimState:SetBuild("build_name")
inst.AnimState:PlayAnimation("anim_name")
```

### Network Component
Quản lý networking cho entity.

```lua
inst.entity:AddNetwork()
inst.Network:SetType(NetworkingType.ENTITY)
```

### InventoryItem Component
Cho phép entity được lưu trong inventory.

```lua
inst:AddComponent("inventoryitem")
inst.components.inventoryitem.imagename = "item_name"
inst.components.inventoryitem.atlasname = "images/item.xml"
```

### Stackable Component
Cho phép entity có thể xếp chồng.

```lua
inst:AddComponent("stackable")
inst.components.stackable.maxsize = 40
```

## Animations

### Tạo Animation

```lua
-- Trong file .scml
local function MakeAnimation(name, bank, build, anim)
    return {
        name = name,
        bank = bank,
        build = build,
        anim = anim
    }
end

-- Ví dụ
local animations = {
    idle = MakeAnimation("idle", "my_item", "my_item", "idle"),
    use = MakeAnimation("use", "my_item", "my_item", "use")
}
```

### Sử dụng Animation

```lua
function MyPrefab:PlayAnimation(anim_name)
    local anim = self.animations[anim_name]
    if anim then
        self.AnimState:PlayAnimation(anim.anim)
    end
end
```

## Networking

### Đồng bộ dữ liệu

```lua
-- Định nghĩa các biến cần đồng bộ
local function OnEntityReplicated(inst)
    inst.replica.MyComponent = inst.replica.MyComponent or {}
    
    -- Thêm các biến cần đồng bộ
    inst.replica.MyComponent:SetValue("health", inst.health)
    inst.replica.MyComponent:SetValue("speed", inst.speed)
end

-- Cập nhật dữ liệu
function MyComponent:SetHealth(health)
    self.health = health
    if self.inst.replica.MyComponent then
        self.inst.replica.MyComponent:SetValue("health", health)
    end
end
```

### RPC Calls

```lua
-- Định nghĩa RPC
local RPC_TYPES = {
    USE_ITEM = "use_item",
    DROP_ITEM = "drop_item"
}

-- Gửi RPC
function MyPrefab:UseItem()
    self.inst.Network:SendRPC(RPC_TYPES.USE_ITEM)
end

-- Nhận RPC
function MyPrefab:OnRPC(rpc_type)
    if rpc_type == RPC_TYPES.USE_ITEM then
        self:DoUseItem()
    end
end
```

## Ví dụ Thực tế

### Custom Item

```lua
local function MakeCustomItem()
    local inst = CreateEntity()
    
    -- Thêm components cơ bản
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    
    -- Thiết lập transform
    inst.Transform:SetScale(1, 1, 1)
    
    -- Thiết lập animation
    inst.AnimState:SetBank("custom_item")
    inst.AnimState:SetBuild("custom_item")
    inst.AnimState:PlayAnimation("idle")
    
    -- Thêm components tùy chỉnh
    inst:AddComponent("inventoryitem")
    inst:AddComponent("stackable")
    inst:AddComponent("equippable")
    
    -- Thiết lập inventory item
    inst.components.inventoryitem.imagename = "custom_item"
    inst.components.inventoryitem.atlasname = "images/custom_item.xml"
    
    -- Thiết lập stackable
    inst.components.stackable.maxsize = 40
    
    -- Thiết lập equippable
    inst.components.equippable:SetOnEquip(function(owner)
        owner.AnimState:OverrideSymbol("swap_object", "custom_item", "swap_object")
    end)
    
    inst.components.equippable:SetOnUnequip(function(owner)
        owner.AnimState:ClearOverrideSymbol("swap_object")
    end)
    
    return inst
end

-- Đăng ký prefab
local CustomItem = MakePrefab(
    "custom_item",
    {
        Asset("ANIM", "anim/custom_item.zip"),
        Asset("ATLAS", "images/custom_item.xml"),
        Asset("IMAGE", "images/custom_item.tex")
    },
    MakeCustomItem
)

-- Thêm vào game
mod:AddPrefab("custom_item", CustomItem)
```

### Custom Structure

```lua
local function MakeCustomStructure()
    local inst = CreateEntity()
    
    -- Thêm components cơ bản
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    
    -- Thiết lập transform
    inst.Transform:SetScale(1, 1, 1)
    
    -- Thiết lập animation
    inst.AnimState:SetBank("custom_structure")
    inst.AnimState:SetBuild("custom_structure")
    inst.AnimState:PlayAnimation("idle")
    
    -- Thêm components tùy chỉnh
    inst:AddComponent("workable")
    inst:AddComponent("lootdropper")
    
    -- Thiết lập workable
    inst.components.workable:SetWorkAction(ACTIONS.HAMMER)
    inst.components.workable:SetWorkLeft(3)
    inst.components.workable:SetOnWorkFinished(function(inst, worker)
        inst.components.lootdropper:SpawnLootPrefab("custom_item")
        inst:Remove()
    end)
    
    return inst
end

-- Đăng ký prefab
local CustomStructure = MakePrefab(
    "custom_structure",
    {
        Asset("ANIM", "anim/custom_structure.zip"),
        Asset("ATLAS", "images/custom_structure.xml"),
        Asset("IMAGE", "images/custom_structure.tex")
    },
    MakeCustomStructure
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

### 4. Assets
- Tối ưu hóa kích thước assets
- Sử dụng atlas cho textures
- Nén animations khi có thể 