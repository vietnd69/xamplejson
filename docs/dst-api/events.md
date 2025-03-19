---
sidebar_position: 3
---

# Events

## Giới thiệu

Hệ thống Events trong DST Mod API cho phép các thành phần khác nhau trong game giao tiếp với nhau thông qua các sự kiện. Đây là một phần quan trọng của kiến trúc event-driven của game.

## Event System

### Đăng ký Event

```lua
-- Đăng ký event handler
entity:ListenForEvent("event_name", handler_function, context)

-- Ví dụ
player:ListenForEvent("onhealthchange", function(inst, data)
    print("Health changed:", data.newhealth)
end, self)
```

### Gửi Event

```lua
-- Gửi event với dữ liệu
entity:PushEvent("event_name", data)

-- Ví dụ
player:PushEvent("onhealthchange", {
    newhealth = 80,
    oldhealth = 100
})
```

## Built-in Events

### Player Events

#### onhealthchange
Kích hoạt khi máu của người chơi thay đổi.

```lua
player:ListenForEvent("onhealthchange", function(inst, data)
    print("Health changed from", data.oldhealth, "to", data.newhealth)
end)
```

#### onhungerchange
Kích hoạt khi độ đói của người chơi thay đổi.

```lua
player:ListenForEvent("onhungerchange", function(inst, data)
    print("Hunger changed from", data.oldhunger, "to", data.newhunger)
end)
```

#### onsanitychange
Kích hoạt khi độ điên của người chơi thay đổi.

```lua
player:ListenForEvent("onsanitychange", function(inst, data)
    print("Sanity changed from", data.oldsanity, "to", data.newsanity)
end)
```

### World Events

#### worldgenerated
Kích hoạt khi thế giới được tạo xong.

```lua
TheWorld:ListenForEvent("worldgenerated", function(inst)
    print("World generation completed")
end)
```

#### daycomplete
Kích hoạt khi một ngày kết thúc.

```lua
TheWorld:ListenForEvent("daycomplete", function(inst)
    print("Day completed")
end)
```

#### nightcomplete
Kích hoạt khi một đêm kết thúc.

```lua
TheWorld:ListenForEvent("nightcomplete", function(inst)
    print("Night completed")
end)
```

### Entity Events

#### onremove
Kích hoạt khi một entity bị xóa.

```lua
entity:ListenForEvent("onremove", function(inst)
    print("Entity removed")
end)
```

#### onbuilt
Kích hoạt khi một item được xây dựng.

```lua
builder:ListenForEvent("onbuilt", function(inst, data)
    print("Built:", data.item)
end)
```

## Custom Events

### Tạo Custom Event

```lua
-- Định nghĩa event type
local EVENT_TYPES = {
    CUSTOM_EVENT = "customevent"
}

-- Đăng ký handler
entity:ListenForEvent(EVENT_TYPES.CUSTOM_EVENT, function(inst, data)
    print("Custom event received:", data.message)
end)

-- Gửi event
entity:PushEvent(EVENT_TYPES.CUSTOM_EVENT, {
    message = "Hello World"
})
```

### Event Data Structure

```lua
-- Ví dụ về cấu trúc dữ liệu event
local eventData = {
    type = "custom_event",
    timestamp = GetTime(),
    source = player,
    target = target,
    data = {
        value1 = 100,
        value2 = "string",
        value3 = {x = 1, y = 2}
    }
}

entity:PushEvent("customevent", eventData)
```

## Event Best Practices

### 1. Đặt tên Event
- Sử dụng tên có ý nghĩa và dễ hiểu
- Tuân thủ quy ước đặt tên (ví dụ: on[event])
- Tránh tên quá chung chung

### 2. Quản lý Event Handlers
- Hủy đăng ký event khi không cần thiết
- Sử dụng context để tránh memory leaks
- Tránh đăng ký nhiều lần cùng một event

```lua
function MyComponent:OnAttach(entity)
    self.entity = entity
    -- Đăng ký event với context
    entity:ListenForEvent("event_name", self.OnEvent, self)
end

function MyComponent:OnDetach()
    -- Hủy đăng ký event
    if self.entity then
        self.entity:RemoveEventCallback("event_name", self.OnEvent, self)
    end
end
```

### 3. Xử lý Event
- Validate dữ liệu event
- Xử lý lỗi một cách graceful
- Tránh xử lý quá nhiều logic trong một handler

```lua
function MyComponent:OnEvent(inst, data)
    -- Validate dữ liệu
    if not data or not data.value then
        print("Invalid event data")
        return
    end

    -- Xử lý event
    self:ProcessEventData(data)
end
```

### 4. Performance
- Tránh gửi event quá thường xuyên
- Batch các event liên quan
- Sử dụng debounce/throttle khi cần thiết

```lua
local function DebounceEvent(entity, event_name, data, delay)
    if entity._debounce_timers and entity._debounce_timers[event_name] then
        return
    end

    entity._debounce_timers = entity._debounce_timers or {}
    entity._debounce_timers[event_name] = true

    entity:DoTaskInTime(delay, function()
        entity:PushEvent(event_name, data)
        entity._debounce_timers[event_name] = nil
    end)
end
```

## Ví dụ Thực tế

### Health System Events

```lua
local HealthSystem = {
    EVENT_TYPES = {
        DAMAGE_TAKEN = "ondamagetaken",
        HEALED = "onhealed",
        DEATH = "ondeath"
    }
}

function HealthSystem:Initialize(entity)
    self.entity = entity
    self.health = 100
    self.max_health = 100

    -- Đăng ký các event handlers
    entity:ListenForEvent(self.EVENT_TYPES.DAMAGE_TAKEN, self.OnDamageTaken, self)
    entity:ListenForEvent(self.EVENT_TYPES.HEALED, self.OnHealed, self)
end

function HealthSystem:TakeDamage(amount)
    local old_health = self.health
    self.health = math.max(0, self.health - amount)

    -- Gửi event damage
    self.entity:PushEvent(self.EVENT_TYPES.DAMAGE_TAKEN, {
        old_health = old_health,
        new_health = self.health,
        damage = amount
    })

    -- Kiểm tra death
    if self.health <= 0 then
        self.entity:PushEvent(self.EVENT_TYPES.DEATH)
    end
end

function HealthSystem:Heal(amount)
    local old_health = self.health
    self.health = math.min(self.max_health, self.health + amount)

    -- Gửi event heal
    self.entity:PushEvent(self.EVENT_TYPES.HEALED, {
        old_health = old_health,
        new_health = self.health,
        heal = amount
    })
end
```

### Inventory System Events

```lua
local InventorySystem = {
    EVENT_TYPES = {
        ITEM_ADDED = "onitemadded",
        ITEM_REMOVED = "onitemremoved",
        INVENTORY_FULL = "oninventoryfull"
    }
}

function InventorySystem:Initialize(entity)
    self.entity = entity
    self.items = {}
    self.max_slots = 10

    -- Đăng ký các event handlers
    entity:ListenForEvent(self.EVENT_TYPES.INVENTORY_FULL, self.OnInventoryFull, self)
end

function InventorySystem:AddItem(item)
    if #self.items >= self.max_slots then
        self.entity:PushEvent(self.EVENT_TYPES.INVENTORY_FULL)
        return false
    end

    table.insert(self.items, item)
    self.entity:PushEvent(self.EVENT_TYPES.ITEM_ADDED, {
        item = item,
        slot = #self.items
    })
    return true
end

function InventorySystem:RemoveItem(item)
    for i, v in ipairs(self.items) do
        if v == item then
            table.remove(self.items, i)
            self.entity:PushEvent(self.EVENT_TYPES.ITEM_REMOVED, {
                item = item,
                slot = i
            })
            return true
        end
    end
    return false
end
``` 