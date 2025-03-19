---
sidebar_position: 1
---

# Core Functions

## Khởi tạo

### `IA.Init()`
Khởi tạo IA Core và thiết lập các thành phần cơ bản.

```lua
IA.Init()
```

### `IA.RegisterComponent(name, component)`
Đăng ký một component mới vào hệ thống.

```lua
IA.RegisterComponent("health", {
    max = 100,
    current = 100,
    OnDamage = function(self, amount)
        self.current = math.max(0, self.current - amount)
    end
})
```

## Quản lý Entity

### `IA.CreateEntity(name, components)`
Tạo một entity mới với các component được chỉ định.

```lua
local entity = IA.CreateEntity("player", {
    health = {max = 100},
    inventory = {slots = 20}
})
```

### `IA.DestroyEntity(entity)`
Xóa một entity khỏi hệ thống.

```lua
IA.DestroyEntity(entity)
```

## Quản lý Event

### `IA.AddEventListener(event, callback)`
Đăng ký một callback cho một sự kiện.

```lua
IA.AddEventListener("player_damaged", function(data)
    print("Player took damage:", data.amount)
end)
```

### `IA.RemoveEventListener(event, callback)`
Xóa một callback đã đăng ký.

```lua
IA.RemoveEventListener("player_damaged", callback)
```

### `IA.TriggerEvent(event, data)`
Kích hoạt một sự kiện với dữ liệu tùy chọn.

```lua
IA.TriggerEvent("player_damaged", {amount = 10})
```

## Quản lý State

### `IA.SetState(key, value)`
Cập nhật state của hệ thống.

```lua
IA.SetState("game_difficulty", "hard")
```

### `IA.GetState(key)`
Lấy giá trị state từ hệ thống.

```lua
local difficulty = IA.GetState("game_difficulty")
```

## Tiện ích

### `IA.Random(min, max)`
Tạo số ngẫu nhiên trong khoảng.

```lua
local damage = IA.Random(5, 15)
```

### `IA.Debug(message)`
In thông tin debug.

```lua
IA.Debug("Entity created:", entity)
```

## Best Practices

1. Luôn sử dụng `IA.Init()` trước khi sử dụng các hàm khác
2. Đăng ký component với tên duy nhất
3. Xóa event listener khi không cần thiết
4. Sử dụng state để quản lý dữ liệu toàn cục
5. Kiểm tra lỗi và xử lý ngoại lệ 