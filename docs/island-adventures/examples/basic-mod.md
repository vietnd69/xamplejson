---
sidebar_position: 1
---

# Ví dụ: Tạo Mod Cơ Bản

Hướng dẫn từng bước để tạo một mod cơ bản sử dụng IslandAdventures.

## Cấu trúc Mod

```
my_island_mod/
├── modinfo.lua
├── modmain.lua
├── scripts/
│   └── island_mod.lua
└── images/
    └── icon.tex
```

## Bước 1: Tạo modinfo.lua

```lua
name = "My Island Mod"
description = "Một mod đơn giản tạo hòn đảo với các tính năng cơ bản"
author = "Your Name"
version = "1.0.0"

dependencies = {
    "IslandAdventures"
}

configuration_options = {
    {
        name = "island_size",
        label = "Kích thước đảo",
        options = {
            {description = "Nhỏ", data = "small"},
            {description = "Vừa", data = "medium"},
            {description = "Lớn", data = "large"}
        },
        default = "medium"
    },
    {
        name = "spawn_rate",
        label = "Tỷ lệ sinh vật",
        options = {
            {description = "Thấp", data = "low"},
            {description = "Trung bình", data = "medium"},
            {description = "Cao", data = "high"}
        },
        default = "medium"
    }
}
```

## Bước 2: Tạo modmain.lua

```lua
-- Load script chính
require("scripts/island_mod")

-- Đăng ký mod với IslandAdventures
IslandAdventures.RegisterMod({
    name = "MyIslandMod",
    version = "1.0.0",
    author = "Your Name",
    description = "A basic island mod"
})

-- Khởi tạo mod
local function init()
    print("My Island Mod đã được khởi tạo!")
end

-- Cleanup khi mod bị tắt
local function cleanup()
    print("My Island Mod đã được dọn dẹp!")
end

-- Đăng ký các hàm khởi tạo và cleanup
IslandAdventures.OnModInit(init)
IslandAdventures.OnModCleanup(cleanup)
```

## Bước 3: Tạo island_mod.lua

```lua
-- Biến toàn cục
local mod_config = {}

-- Khởi tạo cấu hình
local function init_config()
    mod_config = {
        island_size = GetModConfigData("island_size"),
        spawn_rate = GetModConfigData("spawn_rate")
    }
end

-- Tạo đảo mới
local function create_island()
    local island_config = {
        name = "My Custom Island",
        size = mod_config.island_size,
        biome = "tropical",
        spawn_rate = mod_config.spawn_rate,
        features = {
            "beach",
            "forest",
            "pond"
        }
    }
    
    return IslandAdventures.CreateIsland(island_config)
end

-- Thêm các tính năng cho đảo
local function setup_island_features(island_id)
    -- Thêm weather component
    IslandAdventures.AddComponent(island_id, "weather", {
        type = "tropical",
        rain_chance = 0.3
    })
    
    -- Thêm resource component
    IslandAdventures.AddComponent(island_id, "resources", {
        trees = 10,
        rocks = 5,
        berry_bushes = 3
    })
end

-- Xử lý sự kiện khi đảo được tạo
local function on_island_created(island_id)
    print("Đảo mới được tạo:", island_id)
    setup_island_features(island_id)
end

-- Xử lý sự kiện khi người chơi đến đảo
local function on_player_arrived(player, island_id)
    print("Người chơi", player, "đã đến đảo", island_id)
    
    -- Chào mừng người chơi
    local message = "Chào mừng đến với My Custom Island!"
    IslandAdventures.ShowMessage(player, message)
end

-- Khởi tạo mod
local function init()
    init_config()
    
    -- Đăng ký các sự kiện
    IslandAdventures.OnIslandCreated(on_island_created)
    IslandAdventures.OnPlayerArrived(on_player_arrived)
    
    -- Tạo đảo mẫu
    local island_id = create_island()
    if island_id then
        print("Đảo mẫu đã được tạo thành công!")
    end
end

-- Cleanup
local function cleanup()
    -- Hủy đăng ký các sự kiện
    IslandAdventures.RemoveEvent("OnIslandCreated")
    IslandAdventures.RemoveEvent("OnPlayerArrived")
end

-- Export các hàm
return {
    init = init,
    cleanup = cleanup
}
```

## Bước 4: Chạy và Kiểm tra

1. Copy thư mục mod vào thư mục mods của game
2. Khởi động game và bật mod
3. Tạo thế giới mới
4. Kiểm tra console để xem các thông báo
5. Khám phá đảo được tạo

## Mở rộng Mod

### Thêm tính năng mới

```lua
-- Thêm hệ thống nhiệm vụ
local function add_quest_system(island_id)
    local quests = {
        {
            id = "gather_resources",
            title = "Thu thập tài nguyên",
            description = "Thu thập 5 gỗ và 3 đá",
            rewards = {
                items = {"gold", "tools"},
                experience = 100
            }
        }
    }
    
    IslandAdventures.AddComponent(island_id, "quests", {
        available_quests = quests
    })
end

-- Thêm hệ thống thương mại
local function add_trading_system(island_id)
    local trades = {
        {
            item = "wood",
            price = 10,
            quantity = 1
        }
    }
    
    IslandAdventures.AddComponent(island_id, "trading", {
        available_trades = trades
    })
end
```

### Tùy chỉnh giao diện

```lua
-- Thêm UI tùy chỉnh
local function add_custom_ui(island_id)
    local ui_config = {
        name = "island_info",
        position = "top_right",
        elements = {
            {
                type = "text",
                content = "Thông tin đảo",
                style = {
                    color = "white",
                    size = 16
                }
            }
        }
    }
    
    IslandAdventures.AddUI(island_id, ui_config)
end
```

## Tips và Tricks

1. **Debugging**
   ```lua
   -- Thêm logging
   local function debug_log(message)
       print("[My Island Mod] " .. message)
   end
   ```

2. **Error Handling**
   ```lua
   -- Xử lý lỗi an toàn
   local function safe_create_island()
       local success, island_id = pcall(create_island)
       if not success then
           print("Lỗi khi tạo đảo:", island_id)
           return nil
       end
       return island_id
   end
   ```

3. **Performance**
   ```lua
   -- Cache các tham chiếu
   local island_cache = {}
   
   -- Sử dụng cache
   local function get_island_info(island_id)
       if not island_cache[island_id] then
           island_cache[island_id] = IslandAdventures.GetIslandInfo(island_id)
       end
       return island_cache[island_id]
   end
   ``` 