---
sidebar_position: 7
---

# Island Adventures

## Giới thiệu

Island Adventures là một mod mở rộng cho Don't Starve Together, thêm vào các hòn đảo mới, sinh vật, vật phẩm và cơ chế chơi mới. Mod này được xây dựng trên nền tảng IA Core.

## Cấu trúc Thư mục

```
IslandAdventures/
├── anim/           # Chứa các file animation
├── bigportraits/   # Chứa ảnh chân dung lớn
├── images/         # Chứa các file hình ảnh
├── languages/      # Chứa các file ngôn ngữ
├── levels/         # Chứa cấu hình mức độ
├── libraries/      # Chứa các thư viện
├── main/           # Chứa code chính
├── postinit/       # Chứa code khởi tạo sau
├── scripts/        # Chứa các script
├── shaders/        # Chứa các shader
├── sound/          # Chứa các file âm thanh
├── strings/        # Chứa các chuỗi văn bản
├── modmain.lua     # File chính của mod
├── modinfo.lua     # Thông tin về mod
└── modworldgenmain.lua # Cấu hình thế giới
```

## Khởi tạo Mod

### modinfo.lua

```lua
name = "Island Adventures"
description = "A new adventure awaits on mysterious islands"
author = "Your Name"
version = "1.0.0"

-- Dependencies
dependencies = {
    "ia-core"
}

-- Icon
icon_atlas = "ia-icon.xml"
icon = "ia-icon.tex"

-- Configuration
configuration_options = {
    {
        name = "island_density",
        label = "Island Density",
        options = {
            {description = "Low", data = 0.3},
            {description = "Medium", data = 0.5},
            {description = "High", data = 0.7}
        },
        default = 0.5
    },
    {
        name = "difficulty",
        label = "Difficulty",
        options = {
            {description = "Easy", data = "easy"},
            {description = "Normal", data = "normal"},
            {description = "Hard", data = "hard"}
        },
        default = "normal"
    }
}
```

### modmain.lua

```lua
-- Khởi tạo mod
local IA = require("ia-core")

-- Đăng ký các components
IA:RegisterComponent("island", {
    size = 100,
    biomeTypes = {"tropical", "volcanic", "coral"}
})

IA:RegisterComponent("boat", {
    maxHealth = 200,
    speed = 5
})

-- Đăng ký các events
IA:RegisterEvent("onIslandDiscovered", function(inst, island)
    -- Xử lý khi phát hiện đảo mới
    print(string.format("Discovered new island: %s", island.name))
end)

-- Khởi tạo mod
IA:Init()
```

## Islands

### Island Component

```lua
local IslandComponent = IA:CreateComponent("island")

function IslandComponent:Init()
    self.size = self.size
    self.biomeType = self.biomeTypes[math.random(#self.biomeTypes)]
    self.discovered = false
    self.resources = {}
end

function IslandComponent:Generate()
    -- Tạo địa hình
    self:GenerateTerrain()
    
    -- Tạo tài nguyên
    self:GenerateResources()
    
    -- Tạo sinh vật
    self:GenerateMobs()
end

function IslandComponent:GenerateTerrain()
    -- Tạo địa hình dựa trên biome type
    if self.biomeType == "tropical" then
        self:GenerateTropicalTerrain()
    elseif self.biomeType == "volcanic" then
        self:GenerateVolcanicTerrain()
    elseif self.biomeType == "coral" then
        self:GenerateCoralTerrain()
    end
end

function IslandComponent:GenerateResources()
    -- Tạo tài nguyên dựa trên biome type
    if self.biomeType == "tropical" then
        self:GenerateTropicalResources()
    elseif self.biomeType == "volcanic" then
        self:GenerateVolcanicResources()
    elseif self.biomeType == "coral" then
        self:GenerateCoralResources()
    end
end
```

## Boats

### Boat Component

```lua
local BoatComponent = IA:CreateComponent("boat")

function BoatComponent:Init()
    self.health = self.maxHealth
    self.speed = self.speed
    self.cargo = {}
    self.passengers = {}
end

function BoatComponent:TakeDamage(amount)
    self.health = math.max(0, self.health - amount)
    if self.health <= 0 then
        self:Sink()
    end
end

function BoatComponent:Sink()
    -- Xử lý khi thuyền chìm
    self:PushEvent("onBoatSink")
    self:DropCargo()
    self:RemovePassengers()
end

function BoatComponent:AddCargo(item, amount)
    if #self.cargo < self.maxCargo then
        table.insert(self.cargo, {
            item = item,
            amount = amount
        })
        self:PushEvent("onCargoChange")
        return true
    end
    return false
end
```

## World Generation

### Island Generation

```lua
-- Định nghĩa đảo
IA:RegisterIsland("tropical_island", {
    size = 100,
    biomeType = "tropical",
    terrain = {
        ground = "sand",
        vegetation = {
            trees = {
                prefab = "palm_tree",
                density = 0.4,
                spacing = 5
            },
            grass = {
                prefab = "tropical_grass",
                density = 0.6,
                spacing = 3
            }
        }
    },
    resources = {
        food = {
            prefab = "coconut",
            density = 0.3,
            spacing = 4
        },
        materials = {
            prefab = "shell",
            density = 0.5,
            spacing = 2
        }
    },
    mobs = {
        regular = {
            prefab = "crab",
            density = 0.4,
            spacing = 8
        },
        boss = {
            prefab = "island_boss",
            density = 0.1,
            spacing = 20
        }
    }
})

-- Định nghĩa biển
IA:RegisterOcean("tropical_ocean", {
    waves = {
        height = 2,
        speed = 1
    },
    currents = {
        speed = 1.5,
        direction = "random"
    },
    fish = {
        prefab = "tropical_fish",
        density = 0.6,
        spacing = 5
    }
})
```

## Best Practices

### 1. Tổ chức Code
- Tách biệt logic cho từng loại đảo
- Sử dụng components cho các tính năng chính
- Thêm comments chi tiết cho các hàm phức tạp

### 2. Performance
- Tối ưu hóa việc tạo đảo
- Sử dụng pooling cho các đối tượng thường xuyên tạo/xóa
- Giảm thiểu số lượng entities trên mỗi đảo

### 3. Networking
- Đồng bộ trạng thái đảo giữa các người chơi
- Sử dụng RPC cho các hành động quan trọng
- Validate dữ liệu trước khi xử lý

### 4. Testing
- Test các loại đảo khác nhau
- Kiểm tra tính ổn định khi tạo/xóa đảo
- Debug các vấn đề về performance 