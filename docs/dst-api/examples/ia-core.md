---
sidebar_position: 6
---

# IA Core

## Giới thiệu

IA Core là một framework cốt lõi cho việc phát triển mod trong Don't Starve Together. Nó cung cấp các công cụ và tiện ích để xây dựng các mod một cách hiệu quả và có tổ chức.

## Cấu trúc Thư mục

```
ia-core/
├── anim/           # Chứa các file animation
├── images/         # Chứa các file hình ảnh
├── main/           # Chứa code chính
├── postinit/       # Chứa code khởi tạo sau
├── scripts/        # Chứa các script
├── strings/        # Chứa các chuỗi văn bản
├── modmain.lua     # File chính của mod
├── modinfo.lua     # Thông tin về mod
└── modworldgenmain.lua # Cấu hình thế giới
```

## Khởi tạo Mod

### modinfo.lua

```lua
name = "IA Core"
description = "Core framework for DST modding"
author = "Your Name"
version = "1.0.0"

-- Dependencies
dependencies = {
    "ia-core"
}

-- Icon
icon_atlas = "modicon.xml"
icon = "modicon.tex"

-- Configuration
configuration_options = {
    {
        name = "option1",
        label = "Option 1",
        options = {
            {description = "Yes", data = true},
            {description = "No", data = false}
        },
        default = true
    }
}
```

### modmain.lua

```lua
-- Khởi tạo mod
local IA = require("ia-core")

-- Đăng ký các components
IA:RegisterComponent("health", {
    maxHealth = 100,
    regenRate = 1
})

IA:RegisterComponent("inventory", {
    slots = 15,
    stackSize = 40
})

-- Đăng ký các events
IA:RegisterEvent("onHealthChange", function(inst, old, new)
    -- Xử lý khi health thay đổi
    print(string.format("Health changed from %d to %d", old, new))
end)

-- Khởi tạo mod
IA:Init()
```

## Components

### Health Component

```lua
local HealthComponent = IA:CreateComponent("health")

function HealthComponent:Init()
    self.health = self.maxHealth
    self.regenRate = self.regenRate
end

function HealthComponent:TakeDamage(amount)
    local oldHealth = self.health
    self.health = math.max(0, self.health - amount)
    self:PushEvent("onHealthChange", oldHealth, self.health)
end

function HealthComponent:Heal(amount)
    local oldHealth = self.health
    self.health = math.min(self.maxHealth, self.health + amount)
    self:PushEvent("onHealthChange", oldHealth, self.health)
end

function HealthComponent:OnUpdate(dt)
    if self.health < self.maxHealth then
        self:Heal(self.regenRate * dt)
    end
end
```

### Inventory Component

```lua
local InventoryComponent = IA:CreateComponent("inventory")

function InventoryComponent:Init()
    self.slots = {}
    self.maxSlots = self.slots
    self.stackSize = self.stackSize
end

function InventoryComponent:AddItem(item, amount)
    -- Tìm slot trống hoặc slot có thể stack
    for i = 1, #self.slots do
        local slot = self.slots[i]
        if slot.item == item and slot.amount < self.stackSize then
            slot.amount = math.min(self.stackSize, slot.amount + amount)
            self:PushEvent("onInventoryChange")
            return true
        end
    end
    
    -- Tìm slot trống
    for i = 1, #self.slots do
        if not self.slots[i] then
            self.slots[i] = {
                item = item,
                amount = amount
            }
            self:PushEvent("onInventoryChange")
            return true
        end
    end
    
    return false
end

function InventoryComponent:RemoveItem(item, amount)
    for i = 1, #self.slots do
        local slot = self.slots[i]
        if slot.item == item then
            if slot.amount <= amount then
                self.slots[i] = nil
            else
                slot.amount = slot.amount - amount
            end
            self:PushEvent("onInventoryChange")
            return true
        end
    end
    return false
end
```

## Events

### Đăng ký Events

```lua
-- Đăng ký event handler
IA:RegisterEvent("onHealthChange", function(inst, old, new)
    -- Xử lý khi health thay đổi
    print(string.format("Health changed from %d to %d", old, new))
end)

-- Gửi event
inst:PushEvent("onHealthChange", oldHealth, newHealth)

-- Lắng nghe event
inst:ListenForEvent("onHealthChange", function(inst, old, new)
    -- Xử lý khi health thay đổi
    print(string.format("Health changed from %d to %d", old, new))
end)
```

### Custom Events

```lua
-- Định nghĩa custom event
local CustomEvent = IA:CreateEvent("customEvent")

function CustomEvent:Init()
    self.handlers = {}
end

function CustomEvent:AddHandler(handler)
    table.insert(self.handlers, handler)
end

function CustomEvent:RemoveHandler(handler)
    for i, h in ipairs(self.handlers) do
        if h == handler then
            table.remove(self.handlers, i)
            break
        end
    end
end

function CustomEvent:Trigger(...)
    for _, handler in ipairs(self.handlers) do
        handler(...)
    end
end
```

## Networking

### Đồng bộ Dữ liệu

```lua
-- Định nghĩa dữ liệu cần đồng bộ
IA:RegisterNetVar("health", {
    default = 100,
    type = "number"
})

IA:RegisterNetVar("inventory", {
    default = {},
    type = "table"
})

-- Cập nhật dữ liệu
inst:SetNetVar("health", newHealth)

-- Lắng nghe thay đổi
inst:ListenForNetVar("health", function(inst, value)
    print(string.format("Health updated to %d", value))
end)
```

### RPC Calls

```lua
-- Định nghĩa RPC
IA:RegisterRPC("heal", function(inst, amount)
    inst.components.health:Heal(amount)
end)

-- Gọi RPC
inst:SendRPC("heal", 50)

-- Lắng nghe RPC
inst:ListenForRPC("heal", function(inst, amount)
    inst.components.health:Heal(amount)
end)
```

## World Generation

### Cấu hình Thế giới

```lua
-- Định nghĩa biome
IA:RegisterBiome("custom_biome", {
    temperature = 20,
    humidity = 50,
    ground = "custom_ground",
    vegetation = {
        trees = {
            prefab = "custom_tree",
            density = 0.5,
            spacing = 5
        }
    },
    mobs = {
        regular = {
            prefab = "custom_mob",
            density = 0.4,
            spacing = 8
        }
    }
})

-- Định nghĩa cấu trúc
IA:RegisterStructure("custom_structure", {
    prefab = "custom_structure",
    density = 0.3,
    spacing = 10,
    biomes = {"custom_biome"}
})
```

## Best Practices

### 1. Tổ chức Code
- Sử dụng components để tách biệt logic
- Đặt tên rõ ràng và có ý nghĩa
- Thêm comments để giải thích code phức tạp

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