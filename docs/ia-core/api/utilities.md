---
sidebar_position: 4
---

# Utilities

## Math Utilities

### `IA.Math.Random(min, max)`
Tạo số ngẫu nhiên trong khoảng.

```lua
local number = IA.Math.Random(1, 100)
```

### `IA.Math.Lerp(start, target, alpha)`
Nội suy tuyến tính giữa hai giá trị.

```lua
local value = IA.Math.Lerp(0, 100, 0.5) -- 50
```

### `IA.Math.Clamp(value, min, max)`
Giới hạn giá trị trong khoảng.

```lua
local clamped = IA.Math.Clamp(150, 0, 100) -- 100
```

## Vector Utilities

### `IA.Vector.New(x, y)`
Tạo vector mới.

```lua
local pos = IA.Vector.New(10, 20)
```

### `IA.Vector.Distance(v1, v2)`
Tính khoảng cách giữa hai vector.

```lua
local dist = IA.Vector.Distance(pos1, pos2)
```

### `IA.Vector.Normalize(v)`
Chuẩn hóa vector.

```lua
local normalized = IA.Vector.Normalize(vector)
```

## String Utilities

### `IA.String.Format(format, ...)`
Định dạng chuỗi.

```lua
local text = IA.String.Format("Health: %d/%d", current, max)
```

### `IA.String.Split(str, delimiter)`
Tách chuỗi thành mảng.

```lua
local parts = IA.String.Split("a,b,c", ",")
```

### `IA.String.Trim(str)`
Xóa khoảng trắng đầu và cuối.

```lua
local trimmed = IA.String.Trim("  hello  ")
```

## Table Utilities

### `IA.Table.Copy(t)`
Sao chép bảng.

```lua
local copy = IA.Table.Copy(original)
```

### `IA.Table.Merge(t1, t2)`
Gộp hai bảng.

```lua
local merged = IA.Table.Merge(table1, table2)
```

### `IA.Table.IsEmpty(t)`
Kiểm tra bảng rỗng.

```lua
if IA.Table.IsEmpty(table) then
    -- Xử lý khi bảng rỗng
end
```

## Debug Utilities

### `IA.Debug.Log(message, level)`
Ghi log với mức độ.

```lua
IA.Debug.Log("Debug message", "debug")
IA.Debug.Log("Warning message", "warning")
IA.Debug.Log("Error message", "error")
```

### `IA.Debug.Assert(condition, message)`
Kiểm tra điều kiện.

```lua
IA.Debug.Assert(value > 0, "Value must be positive")
```

### `IA.Debug.Profile(name, func)`
Đo thời gian thực thi hàm.

```lua
IA.Debug.Profile("my_function", function()
    -- Code to profile
end)
```

## Best Practices

1. Sử dụng utility functions thay vì tự viết
2. Kiểm tra kết quả trả về từ utility functions
3. Sử dụng debug utilities để theo dõi lỗi
4. Tối ưu hiệu suất khi sử dụng table utilities
5. Xử lý ngoại lệ khi sử dụng math utilities 