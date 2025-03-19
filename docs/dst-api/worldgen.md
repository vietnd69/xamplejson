 ---
sidebar_position: 5
---

# World Generation

## Giới thiệu

World Generation trong DST Mod API cho phép bạn tùy chỉnh cách thế giới game được tạo ra, bao gồm các biome, cấu trúc, mobs và các yếu tố khác.

## Cấu trúc World

### Biomes

```lua
local function AddCustomBiome()
    local biome = {
        name = "custom_biome",
        ground = {
            GROUND.ROAD,
            GROUND.ROAD_NOISE,
            GROUND.FOREST
        },
        vegetation = {
            "grass",
            "sapling",
            "berrybush"
        },
        structures = {
            "custom_structure"
        },
        mobs = {
            "rabbit",
            "beefalo"
        }
    }
    
    AddBiome(biome)
end
```

### Rooms

```lua
local function AddCustomRoom()
    local room = {
        name = "custom_room",
        contents = {
            countprefabs = {
                grass = 10,
                sapling = 5
            },
            distributeprefabs = {
                custom_structure = 0.1
            }
        },
        edges = {
            "custom_biome"
        }
    }
    
    AddRoom(room)
end
```

### Tasks

```lua
local function AddCustomTask()
    local task = {
        name = "custom_task",
        room_choices = {
            custom_room = 1
        },
        room_bg = GROUND.FOREST,
        background_room = "custom_room",
        room_weights = {
            custom_room = 1
        }
    }
    
    AddTask(task)
end
```

## Cấu trúc

### Thêm Cấu trúc vào World

```lua
local function AddCustomStructure()
    local structure = {
        name = "custom_structure",
        prefab = "custom_structure",
        min_spacing = 20,
        max_spacing = 30,
        biomes = {
            custom_biome = 1
        }
    }
    
    AddStructure(structure)
end
```

### Cấu trúc Nested

```lua
local function AddNestedStructure()
    local structure = {
        name = "nested_structure",
        prefab = "nested_structure",
        min_spacing = 20,
        max_spacing = 30,
        biomes = {
            custom_biome = 1
        },
        nested = {
            {
                name = "inner_structure",
                prefab = "inner_structure",
                min_spacing = 5,
                max_spacing = 10
            }
        }
    }
    
    AddStructure(structure)
end
```

## Mobs

### Thêm Mob vào World

```lua
local function AddCustomMob()
    local mob = {
        name = "custom_mob",
        prefab = "custom_mob",
        min_spacing = 10,
        max_spacing = 20,
        biomes = {
            custom_biome = 1
        },
        spawn_chance = 0.5
    }
    
    AddMob(mob)
end
```

### Mob Groups

```lua
local function AddMobGroup()
    local group = {
        name = "custom_group",
        mobs = {
            custom_mob = 1,
            beefalo = 2
        },
        min_spacing = 15,
        max_spacing = 25,
        biomes = {
            custom_biome = 1
        }
    }
    
    AddMobGroup(group)
end
```

## World Settings

### Cấu hình World

```lua
local function ConfigureWorld()
    local settings = {
        world_size = "medium",
        season_start = "autumn",
        day_length = "default",
        weather = "default",
        biomes = {
            custom_biome = 1
        },
        tasks = {
            custom_task = 1
        }
    }
    
    SetWorldSettings(settings)
end
```

### Tùy chỉnh World Size

```lua
local function CustomizeWorldSize()
    local size_settings = {
        small = {
            width = 100,
            height = 100
        },
        medium = {
            width = 150,
            height = 150
        },
        large = {
            width = 200,
            height = 200
        }
    }
    
    SetWorldSizeSettings(size_settings)
end
```

## Ví dụ Thực tế

### Custom Biome với Cấu trúc

```lua
local function CreateCustomBiome()
    -- Tạo biome
    local biome = {
        name = "magical_forest",
        ground = {
            GROUND.FOREST,
            GROUND.GRASS
        },
        vegetation = {
            "grass",
            "sapling",
            "berrybush",
            "flower"
        },
        structures = {
            "magical_tower",
            "magical_altar"
        },
        mobs = {
            "magical_creature",
            "fairy"
        }
    }
    
    AddBiome(biome)
    
    -- Tạo room
    local room = {
        name = "magical_room",
        contents = {
            countprefabs = {
                grass = 15,
                sapling = 8,
                flower = 12
            },
            distributeprefabs = {
                magical_tower = 0.2,
                magical_altar = 0.1
            }
        },
        edges = {
            "magical_forest"
        }
    }
    
    AddRoom(room)
    
    -- Tạo task
    local task = {
        name = "magical_task",
        room_choices = {
            magical_room = 1
        },
        room_bg = GROUND.FOREST,
        background_room = "magical_room",
        room_weights = {
            magical_room = 1
        }
    }
    
    AddTask(task)
end
```

### Custom Structure với Nested Elements

```lua
local function CreateCustomStructure()
    local structure = {
        name = "magical_tower",
        prefab = "magical_tower",
        min_spacing = 30,
        max_spacing = 40,
        biomes = {
            magical_forest = 1
        },
        nested = {
            {
                name = "tower_entrance",
                prefab = "tower_entrance",
                min_spacing = 5,
                max_spacing = 10
            },
            {
                name = "tower_room",
                prefab = "tower_room",
                min_spacing = 8,
                max_spacing = 15
            }
        }
    }
    
    AddStructure(structure)
end
```

### Custom Mob với Group

```lua
local function CreateCustomMob()
    -- Tạo mob
    local mob = {
        name = "magical_creature",
        prefab = "magical_creature",
        min_spacing = 15,
        max_spacing = 25,
        biomes = {
            magical_forest = 1
        },
        spawn_chance = 0.7
    }
    
    AddMob(mob)
    
    -- Tạo mob group
    local group = {
        name = "magical_group",
        mobs = {
            magical_creature = 2,
            fairy = 3
        },
        min_spacing = 20,
        max_spacing = 30,
        biomes = {
            magical_forest = 1
        }
    }
    
    AddMobGroup(group)
end
```

## Best Practices

### 1. Tổ chức Code
- Tách biệt logic thành các hàm riêng biệt
- Sử dụng constants cho các giá trị cố định
- Thêm comments để giải thích logic phức tạp

### 2. Performance
- Tối ưu hóa số lượng biomes và rooms
- Sử dụng caching cho các giá trị thường xuyên truy cập
- Tránh tạo quá nhiều nested structures

### 3. Balance
- Cân bằng tỷ lệ spawn của mobs
- Đảm bảo khoảng cách hợp lý giữa các cấu trúc
- Kiểm tra tính khả thi của world generation

### 4. Testing
- Test world generation với các kích thước khác nhau
- Kiểm tra tính ổn định của world
- Debug các vấn đề về spawn và placement