---
sidebar_position: 2
---

# Components

## Health Component

### `IA.HealthComponent`
Quản lý sức khỏe của entity.

```lua
local health = IA.HealthComponent({
    max = 100,
    current = 100,
    regen_rate = 1,
    regen_interval = 1
})

-- Gây sát thương
health:TakeDamage(10)

-- Hồi máu
health:Heal(5)

-- Kiểm tra trạng thái
if health:IsDead() then
    -- Xử lý khi entity chết
end
```

## Inventory Component

### `IA.InventoryComponent`
Quản lý túi đồ của entity.

```lua
local inventory = IA.InventoryComponent({
    slots = 20,
    stack_size = 40
})

-- Thêm item
inventory:AddItem("item_name", 1)

-- Xóa item
inventory:RemoveItem("item_name", 1)

-- Kiểm tra item
if inventory:HasItem("item_name") then
    -- Xử lý khi có item
end
```

## Combat Component

### `IA.CombatComponent`
Quản lý chiến đấu của entity.

```lua
local combat = IA.CombatComponent({
    damage = 10,
    range = 1.5,
    attack_speed = 1
})

-- Tấn công
combat:Attack(target)

-- Nhận sát thương
combat:TakeDamage(amount)

-- Kiểm tra có thể tấn công
if combat:CanAttack(target) then
    -- Xử lý tấn công
end
```

## Movement Component

### `IA.MovementComponent`
Quản lý di chuyển của entity.

```lua
local movement = IA.MovementComponent({
    speed = 5,
    acceleration = 1
})

-- Di chuyển đến vị trí
movement:MoveTo(position)

-- Dừng di chuyển
movement:Stop()

-- Kiểm tra đang di chuyển
if movement:IsMoving() then
    -- Xử lý khi đang di chuyển
end
```

## Animation Component

### `IA.AnimationComponent`
Quản lý hoạt ảnh của entity.

```lua
local anim = IA.AnimationComponent({
    animations = {
        idle = "idle_anim",
        walk = "walk_anim",
        attack = "attack_anim"
    }
})

-- Phát hoạt ảnh
anim:Play("walk")

-- Dừng hoạt ảnh
anim:Stop()

-- Kiểm tra hoạt ảnh đang phát
if anim:IsPlaying("walk") then
    -- Xử lý khi đang phát hoạt ảnh
end
```

## Best Practices

1. Sử dụng component phù hợp với mục đích
2. Khởi tạo component với các tham số cần thiết
3. Xử lý các sự kiện của component
4. Kiểm tra trạng thái component trước khi sử dụng
5. Tối ưu hiệu suất khi sử dụng component 