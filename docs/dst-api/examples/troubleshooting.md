---
sidebar_position: 3
---

# Xử Lý Sự Cố

## Lỗi Thường Gặp

### Lỗi Khởi Tạo Mod
```lua
-- Lỗi: Mod không khởi động
-- Nguyên nhân: Thiếu dependencies hoặc lỗi cú pháp
-- Cách khắc phục:
local function Init()
    -- Kiểm tra dependencies
    if not IA then
        print("Lỗi: IA Core không được tìm thấy!")
        return
    end
    
    -- Kiểm tra version
    if IA.Version < "1.0.0" then
        print("Lỗi: Phiên bản IA Core không tương thích!")
        return
    end
    
    -- Khởi tạo mod
    print("Mod đã khởi động thành công!")
end
```

### Lỗi Networking
```lua
-- Lỗi: Đồng bộ dữ liệu không hoạt động
-- Nguyên nhân: Thiếu xử lý network hoặc lỗi RPC
-- Cách khắc phục:
local function HandleNetworkError()
    -- Kiểm tra kết nối
    if not TheNet:IsDedicated() then
        print("Lỗi: Không phải server!")
        return
    end
    
    -- Kiểm tra RPC
    if not self.inst.Network then
        print("Lỗi: Entity không có Network component!")
        return
    end
    
    -- Xử lý lỗi
    self.inst.Network:SetTimeout(5) -- Timeout sau 5 giây
end
```

### Lỗi World Generation
```lua
-- Lỗi: World không được tạo đúng
-- Nguyên nhân: Lỗi trong biome hoặc room
-- Cách khắc phục:
local function FixWorldGeneration()
    -- Kiểm tra biome
    if not GLOBAL.GROUND then
        print("Lỗi: GROUND không được định nghĩa!")
        return
    end
    
    -- Kiểm tra room
    if not GLOBAL.RECIPETABS then
        print("Lỗi: RECIPETABS không được định nghĩa!")
        return
    end
    
    -- Xử lý lỗi
    AddPrefabPostInit("world", function(inst)
        if not inst.components.world then
            print("Lỗi: World không có components!")
            return
        end
    end)
end
```

## Debugging

### Logging System
```lua
-- Hệ thống logging để debug
local Debug = {
    enabled = true,
    level = "INFO",
    levels = {
        DEBUG = 1,
        INFO = 2,
        WARNING = 3,
        ERROR = 4
    }
}

function Debug:Log(message, level)
    if not self.enabled then return end
    
    level = level or "INFO"
    local level_value = self.levels[level]
    
    if level_value >= self.levels[self.level] then
        print(string.format("[%s] %s", level, message))
    end
end
```

### Performance Monitoring
```lua
-- Hệ thống theo dõi hiệu suất
local Performance = {
    timers = {},
    stats = {}
}

function Performance:StartTimer(name)
    self.timers[name] = GetTime()
end

function Performance:EndTimer(name)
    if not self.timers[name] then return end
    
    local duration = GetTime() - self.timers[name]
    self.stats[name] = (self.stats[name] or 0) + duration
    
    print(string.format("Timer %s: %.3f seconds", name, duration))
end
```

## Testing

### Unit Testing
```lua
-- Hệ thống unit testing
local Test = {
    tests = {},
    results = {}
}

function Test:AddTest(name, func)
    self.tests[name] = func
end

function Test:RunTests()
    for name, func in pairs(self.tests) do
        local success, error = pcall(func)
        self.results[name] = {
            success = success,
            error = error
        }
    end
    
    self:PrintResults()
end

function Test:PrintResults()
    print("Test Results:")
    for name, result in pairs(self.results) do
        print(string.format("%s: %s", name, result.success and "PASS" or "FAIL"))
        if not result.success then
            print("Error:", result.error)
        end
    end
end
```

## Best Practices

1. Luôn kiểm tra lỗi khi khởi tạo mod
2. Sử dụng logging system để debug
3. Theo dõi hiệu suất thường xuyên
4. Viết unit tests cho các chức năng quan trọng
5. Xử lý lỗi một cách graceful 