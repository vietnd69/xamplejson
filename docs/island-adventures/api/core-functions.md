---
sidebar_position: 1
---

# IslandAdventures API Reference

## Core Functions

### Đăng ký đảo mới

```lua
IslandAdventures.RegisterIsland({
    name = "island_name",
    display_name = "Tên hiển thị",
    description = "Mô tả đảo",
    size = {width = 100, height = 100},
    biome = "biome_name",
    features = {
        "feature1",
        "feature2"
    },
    weather = {
        "weather1",
        "weather2"
    },
    resources = {
        "resource1",
        "resource2"
    }
})
```

### Đăng ký biome mới

```lua
IslandAdventures.RegisterBiome({
    name = "biome_name",
    display_name = "Tên hiển thị",
    description = "Mô tả biome",
    ground = "ground_type",
    vegetation = "vegetation_type",
    features = {
        "feature1",
        "feature2"
    },
    creatures = {
        "creature1",
        "creature2"
    }
})
```

### Đăng ký tính năng mới

```lua
IslandAdventures.RegisterFeature({
    name = "feature_name",
    display_name = "Tên hiển thị",
    description = "Mô tả tính năng",
    on_spawn = function(inst)
        -- Xử lý khi tính năng được tạo
    end,
    on_update = function(inst, dt)
        -- Xử lý khi tính năng được cập nhật
    end
})
```

## Events

### Sự kiện đảo

```lua
-- Khi đảo được tạo
IslandAdventures.OnIslandCreated(function(island)
    -- Xử lý khi đảo được tạo
end)

-- Khi đảo bị phá hủy
IslandAdventures.OnIslandDestroyed(function(island)
    -- Xử lý khi đảo bị phá hủy
end)

-- Khi người chơi vào đảo
IslandAdventures.OnPlayerEnterIsland(function(player, island)
    -- Xử lý khi người chơi vào đảo
end)

-- Khi người chơi rời đảo
IslandAdventures.OnPlayerLeaveIsland(function(player, island)
    -- Xử lý khi người chơi rời đảo
end)
```

### Sự kiện thời tiết

```lua
-- Khi thời tiết thay đổi
IslandAdventures.OnWeatherChanged(function(island, old_weather, new_weather)
    -- Xử lý khi thời tiết thay đổi
end)

-- Khi hiệu ứng thời tiết được áp dụng
IslandAdventures.OnWeatherEffectApplied(function(player, effect)
    -- Xử lý khi hiệu ứng thời tiết được áp dụng
end)
```

### Sự kiện tài nguyên

```lua
-- Khi tài nguyên được thu thập
IslandAdventures.OnResourceGathered(function(player, resource, amount)
    -- Xử lý khi tài nguyên được thu thập
end)

-- Khi tài nguyên được sử dụng
IslandAdventures.OnResourceUsed(function(player, resource, amount)
    -- Xử lý khi tài nguyên được sử dụng
end)
```

## Components

### IslandComponent

```lua
-- Lấy component của đảo
local island_comp = inst.components.island

-- Kiểm tra xem đảo có đang hoạt động không
island_comp:IsActive()

-- Lấy thông tin đảo
local info = island_comp:GetInfo()

-- Cập nhật trạng thái đảo
island_comp:UpdateState(new_state)

-- Thêm tính năng mới
island_comp:AddFeature(feature_name)

-- Xóa tính năng
island_comp:RemoveFeature(feature_name)
```

### WeatherComponent

```lua
-- Lấy component thời tiết
local weather_comp = inst.components.weather

-- Thay đổi thời tiết
weather_comp:ChangeWeather(new_weather)

-- Lấy thời tiết hiện tại
local current_weather = weather_comp:GetCurrentWeather()

-- Thêm hiệu ứng thời tiết
weather_comp:AddEffect(effect_name)

-- Xóa hiệu ứng thời tiết
weather_comp:RemoveEffect(effect_name)
```

### ResourceComponent

```lua
-- Lấy component tài nguyên
local resource_comp = inst.components.resource

-- Thêm tài nguyên
resource_comp:AddResource(resource_name, amount)

-- Xóa tài nguyên
resource_comp:RemoveResource(resource_name, amount)

-- Kiểm tra số lượng tài nguyên
local amount = resource_comp:GetResourceAmount(resource_name)

-- Sử dụng tài nguyên
resource_comp:UseResource(resource_name, amount)
```

## Utilities

### Hàm tiện ích

```lua
-- Tạo vị trí ngẫu nhiên trên đảo
local pos = IslandAdventures.GetRandomPosition(island)

-- Kiểm tra vị trí hợp lệ
local valid = IslandAdventures.IsValidPosition(pos, island)

-- Lấy khoảng cách giữa hai điểm
local distance = IslandAdventures.GetDistance(pos1, pos2)

-- Tạo ID duy nhất
local id = IslandAdventures.GenerateUniqueId()

-- Lưu dữ liệu
IslandAdventures.SaveData(key, data)

-- Đọc dữ liệu
local data = IslandAdventures.LoadData(key)
```

### Constants

```lua
-- Kích thước đảo mặc định
IslandAdventures.DEFAULT_ISLAND_SIZE

-- Số lượng tài nguyên tối đa
IslandAdventures.MAX_RESOURCE_AMOUNT

-- Thời gian cập nhật
IslandAdventures.UPDATE_INTERVAL

-- Các loại thời tiết
IslandAdventures.WEATHER_TYPES

-- Các loại tài nguyên
IslandAdventures.RESOURCE_TYPES
``` 