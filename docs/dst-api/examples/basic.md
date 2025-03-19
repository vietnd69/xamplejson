---
sidebar_position: 1
---

# Ví Dụ Cơ Bản

## Khởi Tạo Mod

### modinfo.lua
```lua
name = "My First Mod"
description = "A basic mod example"
author = "Your Name"
version = "1.0"

-- Khai báo các dependencies
dependencies = {
    "IA Core"
}

-- Khai báo các assets
icon_atlas = "modicon.xml"
icon = "modicon.tex"

-- Khai báo các prefabs
prefabs = {
    "my_item",
    "my_character"
}
```

### modmain.lua
```lua
-- Khởi tạo mod
local function Init()
    print("Mod initialized!")
end

-- Đăng ký các prefabs
local function RegisterPrefabs()
    -- Đăng ký item
    local function CreateItem()
        local inst = CreateEntity()
        inst.entity:AddTransform()
        inst.entity:AddAnimState()
        inst.entity:AddNetwork()
        
        MakeInventoryPhysics(inst)
        MakeInventoryFloatable(inst)
        
        inst.AnimState:SetBank("my_item")
        inst.AnimState:SetBuild("my_item")
        inst.AnimState:PlayAnimation("idle")
        
        inst:AddComponent("inventoryitem")
        inst.components.inventoryitem.imagename = "my_item"
        
        return inst
    end
    
    RegisterPrefab("my_item", CreateItem)
end

-- Đăng ký các recipes
local function RegisterRecipes()
    local recipe = Recipe("my_item", {
        Ingredient("goldnugget", 1),
        Ingredient("twigs", 2)
    }, RECIPETABS.TOOLS, TECH.SCIENCE_ONE)
end

-- Khởi tạo khi game bắt đầu
AddSimPostInit(function()
    Init()
    RegisterPrefabs()
    RegisterRecipes()
end)
```

## Tạo Item Đơn Giản

### Tạo Item Mới
```lua
local function CreateCustomItem()
    local inst = CreateEntity()
    
    -- Thêm các components cần thiết
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    
    -- Thiết lập physics
    MakeInventoryPhysics(inst)
    MakeInventoryFloatable(inst)
    
    -- Thiết lập animation
    inst.AnimState:SetBank("my_item")
    inst.AnimState:SetBuild("my_item")
    inst.AnimState:PlayAnimation("idle")
    
    -- Thêm các components
    inst:AddComponent("inventoryitem")
    inst.components.inventoryitem.imagename = "my_item"
    
    -- Thêm component stackable
    inst:AddComponent("stackable")
    inst.components.stackable.maxsize = TUNING.STACK_SIZE_SMALLITEM
    
    -- Thêm component edible
    inst:AddComponent("edible")
    inst.components.edible.healthvalue = TUNING.HEALING_SMALL
    inst.components.edible.hungervalue = TUNING.CALORIES_SMALL
    
    return inst
end
```

## Tạo Character Đơn Giản

### Tạo Character Mới
```lua
local function CreateCustomCharacter()
    local inst = CreateEntity()
    
    -- Thêm các components cần thiết
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    
    -- Thiết lập animation
    inst.AnimState:SetBank("my_character")
    inst.AnimState:SetBuild("my_character")
    inst.AnimState:PlayAnimation("idle")
    
    -- Thêm các components
    inst:AddComponent("health")
    inst.components.health:SetMaxHealth(150)
    
    inst:AddComponent("hunger")
    inst.components.hunger:SetMax(150)
    
    inst:AddComponent("sanity")
    inst.components.sanity:SetMax(200)
    
    inst:AddComponent("combat")
    inst.components.combat:SetDefaultDamage(20)
    
    inst:AddComponent("inventory")
    
    return inst
end
```

## Tạo Structure Đơn Giản

### Tạo Structure Mới
```lua
local function CreateCustomStructure()
    local inst = CreateEntity()
    
    -- Thêm các components cần thiết
    inst.entity:AddTransform()
    inst.entity:AddAnimState()
    inst.entity:AddNetwork()
    
    -- Thiết lập physics
    MakeObstaclePhysics(inst, 1)
    
    -- Thiết lập animation
    inst.AnimState:SetBank("my_structure")
    inst.AnimState:SetBuild("my_structure")
    inst.AnimState:PlayAnimation("idle")
    
    -- Thêm các components
    inst:AddComponent("workable")
    inst.components.workable:SetWorkAction(ACTIONS.HAMMER)
    inst.components.workable:SetWorkLeft(3)
    inst.components.workable:SetOnWorkCallback(function(inst, worker, workleft)
        if workleft <= 0 then
            inst:Remove()
        end
    end)
    
    return inst
end
```

## Best Practices

1. Luôn kiểm tra lỗi khi tạo entity
2. Sử dụng các components có sẵn khi có thể
3. Tối ưu hiệu suất khi tạo nhiều entity
4. Xử lý networking một cách an toàn
5. Thêm comments để giải thích code 