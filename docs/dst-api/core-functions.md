---
sidebar_position: 1
---

# Core Functions

## Mod Functions

### Mod:Init()
Khởi tạo mod với các cấu hình cơ bản.

```lua
local mod = Mod:Init({
    name = "MyMod",
    version = "1.0.0",
    api_version = "10.0.0",
    description = "Mô tả mod của bạn"
})
```

### Mod:AddComponent(name, component)
Thêm một component mới vào mod.

```lua
mod:AddComponent("MyComponent", {
    properties = {
        health = 100,
        speed = 5
    },
    methods = {
        OnUpdate = function(self, dt)
            -- Xử lý logic cập nhật
        end
    }
})
```

### Mod:AddPrefab(name, prefab)
Thêm một prefab mới vào game.

```lua
mod:AddPrefab("my_item", {
    assets = {
        Asset("ANIM", "anim/my_item.zip"),
        Asset("ATLAS", "images/my_item.xml")
    },
    prefab = function()
        local inst = CreateEntity()
        -- Thiết lập các thuộc tính của prefab
        return inst
    end
})
```

## Component Functions

### Component:OnUpdate(dt)
Được gọi mỗi frame để cập nhật trạng thái của component.

```lua
function MyComponent:OnUpdate(dt)
    -- Xử lý logic cập nhật
end
```

### Component:OnSave()
Được gọi khi lưu game để lưu trạng thái của component.

```lua
function MyComponent:OnSave()
    return {
        health = self.health,
        speed = self.speed
    }
end
```

### Component:OnLoad(data)
Được gọi khi load game để khôi phục trạng thái của component.

```lua
function MyComponent:OnLoad(data)
    self.health = data.health
    self.speed = data.speed
end
```

## Event Functions

### Mod:OnEvent(event_name, callback)
Đăng ký một event handler.

```lua
mod:OnEvent("OnPlayerJoin", function(player)
    print("Player joined:", player.name)
end)
```

### Mod:TriggerEvent(event_name, ...)
Kích hoạt một event với các tham số tùy chọn.

```lua
mod:TriggerEvent("OnCustomEvent", "param1", "param2")
```

## Utility Functions

### Mod:GetWorld()
Lấy tham chiếu đến thế giới game hiện tại.

```lua
local world = mod:GetWorld()
```

### Mod:GetPlayer()
Lấy tham chiếu đến người chơi hiện tại.

```lua
local player = mod:GetPlayer()
```

### Mod:GetTime()
Lấy thời gian trong game.

```lua
local time = mod:GetTime()
```

## Networking Functions

### Mod:SendRPC(player, rpc_name, ...)
Gửi RPC đến một người chơi cụ thể.

```lua
mod:SendRPC(player, "MyRPC", "data1", "data2")
```

### Mod:BroadcastRPC(rpc_name, ...)
Gửi RPC đến tất cả người chơi.

```lua
mod:BroadcastRPC("MyRPC", "data1", "data2")
```

## Debug Functions

### Mod:Log(message, level)
Ghi log với các mức độ khác nhau.

```lua
mod:Log("Debug message", "debug")
mod:Log("Warning message", "warning")
mod:Log("Error message", "error")
```

### Mod:DebugDraw()
Vẽ thông tin debug trên màn hình.

```lua
function MyComponent:DebugDraw()
    -- Vẽ thông tin debug
end
``` 