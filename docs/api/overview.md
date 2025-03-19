---
sidebar_position: 1
---

# API Reference

Tài liệu chi tiết về các API có sẵn trong IslandAdventures.

## Core API

### Island Management

```lua
-- Tạo một hòn đảo mới
local island = IslandAdventures.CreateIsland({
    name = "My Island",
    size = "medium",
    biome = "tropical"
})

-- Lấy thông tin về một hòn đảo
local island_info = IslandAdventures.GetIslandInfo(island_id)

-- Xóa một hòn đảo
IslandAdventures.RemoveIsland(island_id)
```

### Events

```lua
-- Lắng nghe sự kiện khi đảo được tạo
IslandAdventures.OnIslandCreated(function(island_id)
    print("Đảo mới được tạo:", island_id)
end)

-- Lắng nghe sự kiện khi người chơi đến đảo
IslandAdventures.OnPlayerArrived(function(player, island_id)
    print("Người chơi đến đảo:", player, island_id)
end)
```

### Components

```lua
-- Thêm component cho đảo
IslandAdventures.AddComponent(island_id, "weather", {
    type = "tropical",
    rain_chance = 0.3
})

-- Lấy component từ đảo
local weather = IslandAdventures.GetComponent(island_id, "weather")
```

## Extension API

### Creating Extensions

```lua
-- Đăng ký extension mới
IslandAdventures.RegisterExtension({
    name = "MyExtension",
    version = "1.0.0",
    author = "Your Name",
    description = "Description of your extension"
})

-- Thêm hooks cho extension
IslandAdventures.AddHook("OnIslandCreated", function(island_id)
    -- Your code here
end)
```

### Configuration

```lua
-- Thêm cấu hình cho extension
IslandAdventures.AddConfig("MyExtension", {
    {
        name = "feature_enabled",
        label = "Bật tính năng",
        options = {
            {description = "Bật", data = true},
            {description = "Tắt", data = false}
        },
        default = true
    }
})
```

## Utility Functions

### World Generation

```lua
-- Tạo biome mới
IslandAdventures.CreateBiome({
    name = "custom_biome",
    ground = "custom_ground",
    prefabs = {"tree1", "tree2"}
})

-- Thêm prefab vào biome
IslandAdventures.AddPrefabToBiome("custom_biome", "new_prefab")
```

### Player Management

```lua
-- Kiểm tra người chơi có ở trên đảo không
local is_on_island = IslandAdventures.IsPlayerOnIsland(player, island_id)

-- Teleport người chơi đến đảo
IslandAdventures.TeleportPlayerToIsland(player, island_id)
```

## Best Practices

1. **Error Handling**
   ```lua
   local success, result = pcall(function()
       return IslandAdventures.CreateIsland({...})
   end)
   
   if not success then
       print("Lỗi khi tạo đảo:", result)
   end
   ```

2. **Performance**
   ```lua
   -- Cache các tham chiếu
   local island = IslandAdventures.GetIslandInfo(island_id)
   local weather = IslandAdventures.GetComponent(island_id, "weather")
   ```

3. **Cleanup**
   ```lua
   -- Dọn dẹp tài nguyên khi không cần thiết
   IslandAdventures.RemoveIsland(island_id)
   IslandAdventures.RemoveComponent(island_id, "weather")
   ``` 