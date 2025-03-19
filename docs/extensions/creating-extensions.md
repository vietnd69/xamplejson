---
sidebar_position: 1
---

# Tạo Extension cho IslandAdventures

Hướng dẫn chi tiết về cách tạo extension cho IslandAdventures.

## Cấu trúc Extension

Một extension cơ bản có cấu trúc như sau:

```
my_extension/
├── modinfo.lua
├── modmain.lua
├── scripts/
│   └── extension.lua
└── images/
    └── icon.tex
```

## Bắt đầu

### 1. Tạo modinfo.lua

```lua
name = "My Island Extension"
description = "Mô tả extension của bạn"
author = "Tên của bạn"
version = "1.0.0"

dependencies = {
    "IslandAdventures"
}

configuration_options = {
    {
        name = "feature_enabled",
        label = "Bật tính năng",
        options = {
            {description = "Bật", data = true},
            {description = "Tắt", data = false}
        },
        default = true
    }
}
```

### 2. Tạo modmain.lua

```lua
-- Đăng ký extension
IslandAdventures.RegisterExtension({
    name = "MyExtension",
    version = "1.0.0",
    author = "Your Name",
    description = "Description of your extension"
})

-- Load các script
require("scripts/extension")
```

## Tích hợp với IslandAdventures

### 1. Sử dụng Events

```lua
-- Lắng nghe sự kiện
IslandAdventures.OnIslandCreated(function(island_id)
    -- Thêm logic của bạn
    print("Đảo mới được tạo:", island_id)
end)

-- Đăng ký sự kiện mới
IslandAdventures.RegisterEvent("MyCustomEvent", function(data)
    -- Xử lý sự kiện
    print("Custom event triggered:", data)
end)
```

### 2. Thêm Components

```lua
-- Tạo component mới
local MyComponent = {
    name = "my_component",
    init = function(self, island_id)
        self.island_id = island_id
        self.data = {}
    end,
    update = function(self, dt)
        -- Logic cập nhật
    end
}

-- Đăng ký component
IslandAdventures.RegisterComponent(MyComponent)
```

### 3. Tùy chỉnh World Generation

```lua
-- Thêm biome mới
IslandAdventures.CreateBiome({
    name = "my_custom_biome",
    ground = "custom_ground",
    prefabs = {"tree1", "tree2"}
})

-- Thêm prefab vào biome
IslandAdventures.AddPrefabToBiome("my_custom_biome", "new_prefab")
```

## Best Practices

### 1. Error Handling

```lua
-- Xử lý lỗi an toàn
local function safe_call(func, ...)
    local success, result = pcall(func, ...)
    if not success then
        print("Lỗi:", result)
        return nil
    end
    return result
end

-- Sử dụng
safe_call(function()
    IslandAdventures.CreateIsland({...})
end)
```

### 2. Performance

```lua
-- Cache các tham chiếu
local cached_data = {}

-- Sử dụng cache
function get_island_data(island_id)
    if not cached_data[island_id] then
        cached_data[island_id] = IslandAdventures.GetIslandInfo(island_id)
    end
    return cached_data[island_id]
end
```

### 3. Cleanup

```lua
-- Dọn dẹp tài nguyên
function cleanup()
    -- Xóa cache
    cached_data = {}
    
    -- Hủy đăng ký events
    IslandAdventures.RemoveEvent("MyCustomEvent")
    
    -- Xóa components
    IslandAdventures.RemoveComponent("my_component")
end
```

## Ví dụ Extension

### Weather Extension

```lua
-- scripts/weather_extension.lua
local WeatherExtension = {
    name = "WeatherExtension",
    version = "1.0.0",
    author = "Your Name",
    description = "Thêm hệ thống thời tiết mới"
}

-- Đăng ký extension
IslandAdventures.RegisterExtension(WeatherExtension)

-- Thêm weather component
local WeatherComponent = {
    name = "weather",
    init = function(self, island_id)
        self.island_id = island_id
        self.weather_type = "normal"
        self.rain_chance = 0.3
    end,
    update = function(self, dt)
        -- Logic cập nhật thời tiết
        if math.random() < self.rain_chance then
            self.weather_type = "rain"
        else
            self.weather_type = "normal"
        end
    end
}

IslandAdventures.RegisterComponent(WeatherComponent)

-- Thêm events
IslandAdventures.RegisterEvent("OnWeatherChange", function(island_id, weather_type)
    print("Thời tiết thay đổi trên đảo", island_id, ":", weather_type)
end)
```

## Testing

### 1. Unit Tests

```lua
-- tests/weather_test.lua
local function test_weather_component()
    local island_id = "test_island"
    local component = WeatherComponent.new(island_id)
    
    -- Test initialization
    assert(component.weather_type == "normal")
    assert(component.rain_chance == 0.3)
    
    -- Test update
    component.update(1)
    assert(component.weather_type == "rain" or component.weather_type == "normal")
end
```

### 2. Integration Tests

```lua
-- tests/integration_test.lua
local function test_weather_extension()
    local island_id = IslandAdventures.CreateIsland({
        name = "Test Island",
        size = "small"
    })
    
    -- Test weather component
    local weather = IslandAdventures.GetComponent(island_id, "weather")
    assert(weather ~= nil)
    
    -- Test weather events
    local event_triggered = false
    IslandAdventures.OnWeatherChange(function(id, type)
        if id == island_id then
            event_triggered = true
        end
    end)
    
    weather.weather_type = "storm"
    assert(event_triggered)
end
``` 