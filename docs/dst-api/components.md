---
sidebar_position: 2
---

# Components

## Giới thiệu

Components là các module có thể tái sử dụng để thêm chức năng vào các entity trong game. Mỗi component có thể chứa các thuộc tính, phương thức và xử lý sự kiện riêng.

## Tạo Component

### Cấu trúc cơ bản

```lua
local MyComponent = Component({
    name = "MyComponent",
    properties = {
        health = 100,
        speed = 5,
        is_active = true
    },
    methods = {
        OnUpdate = function(self, dt)
            -- Xử lý logic cập nhật
        end,
        OnSave = function(self)
            return {
                health = self.health,
                speed = self.speed
            }
        end,
        OnLoad = function(self, data)
            self.health = data.health
            self.speed = data.speed
        end
    }
})
```

### Đăng ký Component

```lua
mod:AddComponent("MyComponent", MyComponent)
```

## Lifecycle Methods

### OnUpdate(dt)
Được gọi mỗi frame để cập nhật trạng thái của component.

```lua
function MyComponent:OnUpdate(dt)
    if self.is_active then
        -- Xử lý logic cập nhật
    end
end
```

### OnSave()
Được gọi khi lưu game để lưu trạng thái của component.

```lua
function MyComponent:OnSave()
    return {
        health = self.health,
        speed = self.speed,
        is_active = self.is_active
    }
end
```

### OnLoad(data)
Được gọi khi load game để khôi phục trạng thái của component.

```lua
function MyComponent:OnLoad(data)
    self.health = data.health
    self.speed = data.speed
    self.is_active = data.is_active
end
```

### OnAttach(entity)
Được gọi khi component được gắn vào một entity.

```lua
function MyComponent:OnAttach(entity)
    self.entity = entity
    -- Khởi tạo các thuộc tính cần thiết
end
```

### OnDetach()
Được gọi khi component bị tách khỏi entity.

```lua
function MyComponent:OnDetach()
    -- Dọn dẹp tài nguyên
    self.entity = nil
end
```

## Event Handling

### Đăng ký Event

```lua
function MyComponent:OnAttach(entity)
    self.entity = entity
    entity:ListenForEvent("onhealthchange", self.OnHealthChange, self)
end
```

### Xử lý Event

```lua
function MyComponent:OnHealthChange(inst, data)
    -- Xử lý sự kiện thay đổi máu
    print("Health changed:", data.newhealth)
end
```

## Component Communication

### Gửi Event

```lua
function MyComponent:SendCustomEvent(data)
    self.entity:PushEvent("mycustomevent", data)
end
```

### Nhận Event

```lua
function MyComponent:OnAttach(entity)
    self.entity = entity
    entity:ListenForEvent("mycustomevent", self.OnCustomEvent, self)
end

function MyComponent:OnCustomEvent(inst, data)
    -- Xử lý sự kiện tùy chỉnh
    print("Custom event received:", data)
end
```

## Best Practices

1. **Tổ chức Code**
   - Tách biệt logic thành các component nhỏ, có thể tái sử dụng
   - Sử dụng tên có ý nghĩa cho các component và phương thức
   - Thêm comments để giải thích logic phức tạp

2. **Quản lý Tài nguyên**
   - Giải phóng tài nguyên trong OnDetach
   - Tránh memory leaks bằng cách hủy đăng ký events
   - Sử dụng weak references khi cần thiết

3. **Performance**
   - Tối ưu hóa OnUpdate để tránh lag
   - Sử dụng caching cho các giá trị thường xuyên truy cập
   - Tránh tạo garbage trong các vòng lặp

4. **Networking**
   - Xử lý đồng bộ dữ liệu một cách cẩn thận
   - Sử dụng RPC cho các thay đổi quan trọng
   - Validate dữ liệu trước khi xử lý

## Ví dụ Thực tế

### Health Component

```lua
local HealthComponent = Component({
    name = "HealthComponent",
    properties = {
        max_health = 100,
        current_health = 100,
        regeneration_rate = 1
    },
    methods = {
        OnUpdate = function(self, dt)
            if self.current_health < self.max_health then
                self.current_health = math.min(
                    self.max_health,
                    self.current_health + self.regeneration_rate * dt
                )
                self.entity:PushEvent("onhealthchange", {
                    newhealth = self.current_health
                })
            end
        end,
        TakeDamage = function(self, amount)
            self.current_health = math.max(0, self.current_health - amount)
            self.entity:PushEvent("onhealthchange", {
                newhealth = self.current_health
            })
        end
    }
})
```

### Inventory Component

```lua
local InventoryComponent = Component({
    name = "InventoryComponent",
    properties = {
        items = {},
        max_slots = 10
    },
    methods = {
        AddItem = function(self, item)
            if #self.items < self.max_slots then
                table.insert(self.items, item)
                self.entity:PushEvent("onitemadded", {
                    item = item
                })
                return true
            end
            return false
        end,
        RemoveItem = function(self, item)
            for i, v in ipairs(self.items) do
                if v == item then
                    table.remove(self.items, i)
                    self.entity:PushEvent("onitemremoved", {
                        item = item
                    })
                    return true
                end
            end
            return false
        end
    }
})
``` 