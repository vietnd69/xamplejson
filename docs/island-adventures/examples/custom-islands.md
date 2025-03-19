---
sidebar_position: 2
---

# Ví dụ: Tạo Đảo Tùy Chỉnh

Hướng dẫn chi tiết về cách tạo một hòn đảo tùy chỉnh với các tính năng độc đáo.

## Định nghĩa Đảo

```lua
-- Định nghĩa cấu hình đảo
local island_config = {
    name = "Đảo Bí Ẩn",
    size = "large",
    biome = "mysterious",
    features = {
        "ancient_ruins",
        "crystal_caves",
        "floating_islands"
    },
    weather = {
        type = "mystical",
        effects = {
            "crystal_rain",
            "floating_debris"
        }
    },
    resources = {
        unique_items = {
            "crystal_shard",
            "ancient_relic",
            "floating_rock"
        },
        spawn_rates = {
            crystal_shard = 0.3,
            ancient_relic = 0.1,
            floating_rock = 0.5
        }
    }
}
```

## Tạo Biome Tùy Chỉnh

```lua
-- Định nghĩa biome mới
local mysterious_biome = {
    name = "mysterious",
    ground = "crystal_ground",
    prefabs = {
        "crystal_tree",
        "ancient_statue",
        "floating_platform"
    },
    decorations = {
        "crystal_flower",
        "ancient_rune",
        "mystical_orb"
    },
    background = "mystical_background",
    music = "mysterious_theme"
}

-- Đăng ký biome
IslandAdventures.CreateBiome(mysterious_biome)
```

## Thêm Components Đặc Biệt

### 1. Hệ thống Bí Ẩn

```lua
local mystery_system = {
    name = "mystery",
    init = function(self, island_id)
        self.island_id = island_id
        self.secrets = {}
        self.discovered = false
    end,
    update = function(self, dt)
        -- Logic cập nhật bí ẩn
        if not self.discovered then
            self.check_for_discovery()
        end
    end,
    check_for_discovery = function(self)
        -- Kiểm tra điều kiện khám phá
        local player = IslandAdventures.GetNearestPlayer(self.island_id)
        if player then
            local distance = IslandAdventures.GetDistance(player, self.secrets.location)
            if distance < 5 then
                self.discovered = true
                self.reveal_secret()
            end
        end
    end,
    reveal_secret = function(self)
        -- Hiển thị bí ẩn
        IslandAdventures.ShowMessage("Bạn đã khám phá ra một bí ẩn cổ xưa!")
        IslandAdventures.SpawnPrefab(self.island_id, "ancient_portal")
    end
}

IslandAdventures.RegisterComponent(mystery_system)
```

### 2. Hệ thống Thời Tiết Đặc Biệt

```lua
local mystical_weather = {
    name = "mystical_weather",
    init = function(self, island_id)
        self.island_id = island_id
        self.current_effect = "normal"
        self.effect_duration = 0
    end,
    update = function(self, dt)
        -- Cập nhật hiệu ứng thời tiết
        self.effect_duration = self.effect_duration - dt
        if self.effect_duration <= 0 then
            self.change_weather_effect()
        end
    end,
    change_weather_effect = function(self)
        local effects = {
            "crystal_rain",
            "floating_debris",
            "mystical_fog"
        }
        self.current_effect = effects[math.random(#effects)]
        self.effect_duration = math.random(30, 60)
        self.apply_weather_effect()
    end,
    apply_weather_effect = function(self)
        IslandAdventures.SetWeatherEffect(self.island_id, self.current_effect)
    end
}

IslandAdventures.RegisterComponent(mystical_weather)
```

## Tạo Sự Kiện Đặc Biệt

```lua
-- Đăng ký các sự kiện đặc biệt
IslandAdventures.RegisterEvent("OnSecretDiscovered", function(island_id, secret_id)
    print("Bí ẩn được khám phá:", secret_id)
    -- Phần thưởng cho người chơi
    IslandAdventures.GiveReward({
        items = {"crystal_shard", "ancient_relic"},
        experience = 500
    })
end)

IslandAdventures.RegisterEvent("OnWeatherEffectChange", function(island_id, effect)
    print("Hiệu ứng thời tiết thay đổi:", effect)
    -- Thay đổi môi trường
    IslandAdventures.UpdateEnvironment(island_id, effect)
end)
```

## Tạo UI Tùy Chỉnh

```lua
local mystery_ui = {
    name = "mystery_hud",
    position = "top_right",
    elements = {
        {
            type = "text",
            content = "Bí ẩn đã khám phá: {discovered}/{total}",
            style = {
                color = "purple",
                size = 16,
                font = "mystical"
            }
        },
        {
            type = "progress_bar",
            content = "Tiến độ khám phá",
            style = {
                color = "crystal",
                width = 200
            }
        }
    },
    update = function(self, data)
        self.elements[1].content = string.format(
            "Bí ẩn đã khám phá: %d/%d",
            data.discovered,
            data.total
        )
        self.elements[2].value = data.discovered / data.total
    end
}

IslandAdventures.AddUI(island_id, mystery_ui)
```

## Tạo NPC Đặc Biệt

```lua
local ancient_guardian = {
    name = "ancient_guardian",
    prefab = "guardian",
    dialogue = {
        greeting = "Chào mừng đến với vùng đất bí ẩn...",
        quest = "Giúp ta khám phá những bí ẩn cổ xưa...",
        reward = "Cảm ơn ngươi đã giúp đỡ..."
    },
    quests = {
        {
            id = "find_crystals",
            title = "Thu thập tinh thể",
            description = "Tìm 5 tinh thể cổ xưa",
            rewards = {
                items = {"ancient_relic"},
                experience = 300
            }
        }
    }
}

IslandAdventures.AddNPC(island_id, ancient_guardian)
```

## Tips và Tricks

### 1. Tối ưu hiệu suất

```lua
-- Cache các tham chiếu
local island_cache = {}

-- Sử dụng cache
local function get_island_data(island_id)
    if not island_cache[island_id] then
        island_cache[island_id] = {
            mystery = IslandAdventures.GetComponent(island_id, "mystery"),
            weather = IslandAdventures.GetComponent(island_id, "mystical_weather")
        }
    end
    return island_cache[island_id]
end
```

### 2. Xử lý lỗi

```lua
-- Xử lý lỗi an toàn
local function safe_spawn_prefab(island_id, prefab)
    local success, result = pcall(function()
        return IslandAdventures.SpawnPrefab(island_id, prefab)
    end)
    
    if not success then
        print("Lỗi khi spawn prefab:", result)
        return nil
    end
    
    return result
end
```

### 3. Debugging

```lua
-- Hệ thống logging
local function debug_log(message, level)
    local levels = {
        info = "INFO",
        warning = "WARNING",
        error = "ERROR"
    }
    
    print(string.format("[Mysterious Island] %s: %s",
        levels[level] or "INFO",
        message
    ))
end
``` 