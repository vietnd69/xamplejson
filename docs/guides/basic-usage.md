---
sidebar_position: 1
---

# Hướng dẫn sử dụng cơ bản

Hướng dẫn cơ bản về cách sử dụng IslandAdventures trong game.

## Khởi tạo thế giới

1. Khởi động game và tạo thế giới mới
2. Trong menu Mods, đảm bảo IslandAdventures được bật
3. Chọn các tùy chọn cấu hình phù hợp:
   - Kích thước đảo
   - Tỷ lệ sinh vật
   - Loại đảo

## Khám phá đảo

### Tìm đảo

1. Sử dụng bản đồ để tìm các hòn đảo
2. Đảo sẽ được hiển thị với biểu tượng đặc biệt
3. Di chuyển đến đảo bằng thuyền hoặc teleport

### Tương tác với đảo

1. **Thu thập tài nguyên**
   - Các đảo có tài nguyên độc đáo
   - Sử dụng công cụ phù hợp để thu thập

2. **Xây dựng**
   - Đặt các công trình trên đảo
   - Tạo căn cứ hoặc trạm dừng chân

3. **Sinh tồn**
   - Quan sát thời tiết đặc biệt
   - Chuẩn bị thức ăn và nước uống
   - Đối phó với các sinh vật địa phương

## Quản lý đảo

### Cấu hình đảo

```lua
-- Trong game console hoặc mod script
local island_config = {
    name = "Đảo của tôi",
    size = "medium",
    biome = "tropical",
    spawn_rate = "medium"
}

IslandAdventures.ConfigureIsland(island_id, island_config)
```

### Theo dõi trạng thái

1. Kiểm tra sức khỏe đảo
2. Theo dõi tài nguyên
3. Quan sát thời tiết

## Tips và Tricks

1. **Chuẩn bị trước khi khám phá**
   - Mang theo đủ thức ăn và nước
   - Chuẩn bị công cụ cần thiết
   - Kiểm tra dự báo thời tiết

2. **Tối ưu hóa trải nghiệm**
   - Sử dụng bản đồ để lên kế hoạch
   - Tạo các trạm dừng chân
   - Lưu trữ tài nguyên dự phòng

3. **Xử lý tình huống khẩn cấp**
   - Có kế hoạch thoát hiểm
   - Chuẩn bị vật dụng y tế
   - Biết cách gọi cứu hộ

## Ví dụ thực tế

### Tạo căn cứ trên đảo

```lua
-- Ví dụ về cách tạo căn cứ cơ bản
local base_config = {
    location = "beach",
    size = "small",
    structures = {
        "campfire",
        "science_machine",
        "chest"
    }
}

IslandAdventures.CreateBase(island_id, base_config)
```

### Quản lý tài nguyên

```lua
-- Theo dõi và quản lý tài nguyên
local resources = IslandAdventures.GetIslandResources(island_id)

if resources.food < 100 then
    -- Trồng thêm cây ăn quả
    IslandAdventures.PlantCrops(island_id, "berrybush", 5)
end
``` 