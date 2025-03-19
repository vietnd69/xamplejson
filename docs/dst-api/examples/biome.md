---
sidebar_position: 5
---

# Biome Modding

## Giới thiệu

Biome Modding cho phép bạn tạo các biome tùy chỉnh với các đặc điểm, thực vật, động vật và cấu trúc riêng. Tài liệu này sẽ hướng dẫn chi tiết cách tạo một biome hoàn chỉnh.

## Cấu trúc Cơ bản

### Khởi tạo Biome

```lua
local function MakeCustomBiome()
    local inst = CreateEntity()
    
    -- Thêm components cơ bản
    inst.entity:AddTransform()
    inst.entity:AddNetwork()
    inst.entity:AddMiniMapEntity()
    
    -- Thiết lập transform
    inst.Transform:SetScale(1, 1, 1)
    
    -- Thiết lập minimap
    inst.MiniMapEntity:SetIcon("custom_biome.tex")
    
    -- Thêm components tùy chỉnh
    inst:AddComponent("biome")
    inst:AddComponent("spawner")
    inst:AddComponent("weather")
    inst:AddComponent("light")
    
    -- Thiết lập biome
    inst.components.biome:SetBiomeType("custom_biome")
    inst.components.biome:SetTemperature(20)
    inst.components.biome:SetHumidity(50)
    
    -- Thiết lập spawner
    inst.components.spawner:SetSpawnRate(1)
    inst.components.spawner:SetMaxEntities(10)
    
    -- Thiết lập weather
    inst.components.weather:SetTemperature(20)
    inst.components.weather:SetHumidity(50)
    inst.components.weather:SetWindSpeed(0)
    
    -- Thiết lập light
    inst.components.light:SetFalloff(0.7)
    inst.components.light:SetIntensity(.5)
    inst.components.light:SetRadius(0.5)
    inst.components.light:SetColour(0, 0, 0)
    inst.components.light:Enable(true)
    
    return inst
end
```

## Thuộc tính và Hành vi

### Thuộc tính Cơ bản

```lua
local function SetBiomeStats(inst)
    -- Biome
    inst.components.biome:SetBiomeType("custom_biome")
    inst.components.biome:SetTemperature(20)
    inst.components.biome:SetHumidity(50)
    inst.components.biome:SetGroundType("custom_ground")
    inst.components.biome:SetVegetation("custom_vegetation")
    
    -- Spawner
    inst.components.spawner:SetSpawnRate(1)
    inst.components.spawner:SetMaxEntities(10)
    inst.components.spawner:SetSpawnList({
        "custom_mob1",
        "custom_mob2",
        "custom_mob3"
    })
    
    -- Weather
    inst.components.weather:SetTemperature(20)
    inst.components.weather:SetHumidity(50)
    inst.components.weather:SetWindSpeed(0)
    inst.components.weather:SetPrecipitation(0)
    
    -- Light
    inst.components.light:SetFalloff(0.7)
    inst.components.light:SetIntensity(.5)
    inst.components.light:SetRadius(0.5)
    inst.components.light:SetColour(0, 0, 0)
    inst.components.light:Enable(true)
end
```

### Hành vi Đặc biệt

```lua
local function AddSpecialBehaviors(inst)
    -- Thêm component tùy chỉnh
    inst:AddComponent("custom_behavior")
    
    -- Định nghĩa các hành vi
    local behaviors = {
        -- Hành vi khi biome được tạo
        OnCreated = function(inst)
            -- Xử lý khi biome được tạo
            inst:PushEvent("custom_biome_created")
        end,
        
        -- Hành vi khi biome bị phá hủy
        OnDestroyed = function(inst)
            -- Xử lý khi biome bị phá hủy
            inst:PushEvent("custom_biome_destroyed")
        end,
        
        -- Hành vi khi thời tiết thay đổi
        OnWeatherChanged = function(inst, weather)
            -- Xử lý khi thời tiết thay đổi
            inst:PushEvent("custom_biome_weather_changed", weather)
        end
    }
    
    -- Thêm các hành vi vào component
    for name, behavior in pairs(behaviors) do
        inst.components.custom_behavior:AddBehavior(name, behavior)
    end
end
```

## Thực vật và Động vật

### Thiết lập Thực vật

```lua
local function SetupVegetation(inst)
    -- Định nghĩa các loại thực vật
    local vegetation = {
        -- Cây
        trees = {
            prefab = "custom_tree",
            density = 0.5,
            spacing = 5
        },
        
        -- Cỏ
        grass = {
            prefab = "custom_grass",
            density = 0.8,
            spacing = 2
        },
        
        -- Hoa
        flowers = {
            prefab = "custom_flower",
            density = 0.3,
            spacing = 3
        }
    }
    
    -- Thêm thực vật vào biome
    for type, data in pairs(vegetation) do
        inst.components.biome:AddVegetation(type, data)
    end
end
```

### Thiết lập Động vật

```lua
local function SetupMobs(inst)
    -- Định nghĩa các loại động vật
    local mobs = {
        -- Động vật thường
        regular = {
            prefab = "custom_mob1",
            density = 0.4,
            spacing = 8
        },
        
        -- Động vật hiếm
        rare = {
            prefab = "custom_mob2",
            density = 0.1,
            spacing = 15
        },
        
        -- Boss
        boss = {
            prefab = "custom_boss",
            density = 0.01,
            spacing = 30
        }
    }
    
    -- Thêm động vật vào biome
    for type, data in pairs(mobs) do
        inst.components.biome:AddMob(type, data)
    end
end
```

## Cấu trúc và Địa hình

### Thiết lập Cấu trúc

```lua
local function SetupStructures(inst)
    -- Định nghĩa các cấu trúc
    local structures = {
        -- Cấu trúc thường
        regular = {
            prefab = "custom_structure1",
            density = 0.3,
            spacing = 10
        },
        
        -- Cấu trúc đặc biệt
        special = {
            prefab = "custom_structure2",
            density = 0.1,
            spacing = 20
        },
        
        -- Cấu trúc hiếm
        rare = {
            prefab = "custom_structure3",
            density = 0.05,
            spacing = 30
        }
    }
    
    -- Thêm cấu trúc vào biome
    for type, data in pairs(structures) do
        inst.components.biome:AddStructure(type, data)
    end
end
```

### Thiết lập Địa hình

```lua
local function SetupTerrain(inst)
    -- Định nghĩa các loại địa hình
    local terrain = {
        -- Đất
        ground = {
            type = "custom_ground",
            density = 1.0,
            spacing = 1
        },
        
        -- Nước
        water = {
            type = "custom_water",
            density = 0.2,
            spacing = 5
        },
        
        -- Đá
        rock = {
            type = "custom_rock",
            density = 0.3,
            spacing = 8
        }
    }
    
    -- Thêm địa hình vào biome
    for type, data in pairs(terrain) do
        inst.components.biome:AddTerrain(type, data)
    end
end
```

## Networking và Đồng bộ

### Đồng bộ Trạng thái

```lua
local function SetupNetworking(inst)
    -- Định nghĩa các biến cần đồng bộ
    local function OnEntityReplicated(inst)
        inst.replica.CustomBiome = inst.replica.CustomBiome or {}
        
        -- Đồng bộ temperature
        inst.replica.CustomBiome:SetValue("temperature", inst.components.biome:GetTemperature())
        
        -- Đồng bộ humidity
        inst.replica.CustomBiome:SetValue("humidity", inst.components.biome:GetHumidity())
    end
    
    -- Cập nhật dữ liệu
    function inst:UpdateStats()
        if self.replica.CustomBiome then
            self.replica.CustomBiome:SetValue("temperature", self.components.biome:GetTemperature())
            self.replica.CustomBiome:SetValue("humidity", self.components.biome:GetHumidity())
        end
    end
end
```

### RPC Calls

```lua
local function SetupRPCs(inst)
    -- Định nghĩa RPC types
    local RPC_TYPES = {
        CHANGE_WEATHER = "change_weather",
        SPAWN_MOB = "spawn_mob",
        GENERATE_STRUCTURE = "generate_structure"
    }
    
    -- Gửi RPC
    function inst:ChangeWeather(weather)
        self.Network:SendRPC(RPC_TYPES.CHANGE_WEATHER, weather)
    end
    
    -- Nhận RPC
    function inst:OnRPC(rpc_type, ...)
        if rpc_type == RPC_TYPES.CHANGE_WEATHER then
            local weather = ...
            self:DoChangeWeather(weather)
        elseif rpc_type == RPC_TYPES.SPAWN_MOB then
            self:DoSpawnMob()
        elseif rpc_type == RPC_TYPES.GENERATE_STRUCTURE then
            self:DoGenerateStructure()
        end
    end
end
```

## Ví dụ Hoàn chỉnh

### Custom Biome với Tất cả Tính năng

```lua
local function CreateCompleteBiome()
    local inst = CreateEntity()
    
    -- Khởi tạo cơ bản
    inst.entity:AddTransform()
    inst.entity:AddNetwork()
    inst.entity:AddMiniMapEntity()
    
    -- Thiết lập transform và visuals
    inst.Transform:SetScale(1, 1, 1)
    inst.MiniMapEntity:SetIcon("custom_biome.tex")
    
    -- Thêm components
    inst:AddComponent("biome")
    inst:AddComponent("spawner")
    inst:AddComponent("weather")
    inst:AddComponent("light")
    inst:AddComponent("custom_behavior")
    
    -- Thiết lập stats
    SetBiomeStats(inst)
    
    -- Thêm hành vi đặc biệt
    AddSpecialBehaviors(inst)
    
    -- Thiết lập thực vật
    SetupVegetation(inst)
    
    -- Thiết lập động vật
    SetupMobs(inst)
    
    -- Thiết lập cấu trúc
    SetupStructures(inst)
    
    -- Thiết lập địa hình
    SetupTerrain(inst)
    
    -- Thiết lập networking
    SetupNetworking(inst)
    SetupRPCs(inst)
    
    return inst
end

-- Đăng ký prefab
local CustomBiome = MakePrefab(
    "custom_biome",
    {
        Asset("ANIM", "anim/custom_biome.zip"),
        Asset("ATLAS", "images/custom_biome.xml"),
        Asset("IMAGE", "images/custom_biome.tex"),
        Asset("SOUND", "sound/custom_biome.fsb")
    },
    CreateCompleteBiome
)

-- Thêm vào game
mod:AddPrefab("custom_biome", CustomBiome)
```

## Best Practices

### 1. Tổ chức Code
- Tách biệt logic thành các hàm riêng biệt
- Sử dụng constants cho các giá trị cố định
- Thêm comments để giải thích logic phức tạp

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