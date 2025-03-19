---
sidebar_position: 3
---

# Events

## Entity Events

### `entity_created`
Kích hoạt khi một entity được tạo.

```lua
IA.AddEventListener("entity_created", function(data)
    print("Entity created:", data.entity)
end)
```

### `entity_destroyed`
Kích hoạt khi một entity bị phá hủy.

```lua
IA.AddEventListener("entity_destroyed", function(data)
    print("Entity destroyed:", data.entity)
end)
```

## Component Events

### `component_added`
Kích hoạt khi một component được thêm vào entity.

```lua
IA.AddEventListener("component_added", function(data)
    print("Component added:", data.entity, data.component)
end)
```

### `component_removed`
Kích hoạt khi một component bị xóa khỏi entity.

```lua
IA.AddEventListener("component_removed", function(data)
    print("Component removed:", data.entity, data.component)
end)
```

## Combat Events

### `combat_started`
Kích hoạt khi bắt đầu chiến đấu.

```lua
IA.AddEventListener("combat_started", function(data)
    print("Combat started:", data.attacker, data.target)
end)
```

### `combat_ended`
Kích hoạt khi kết thúc chiến đấu.

```lua
IA.AddEventListener("combat_ended", function(data)
    print("Combat ended:", data.winner, data.loser)
end)
```

## Inventory Events

### `item_added`
Kích hoạt khi thêm item vào inventory.

```lua
IA.AddEventListener("item_added", function(data)
    print("Item added:", data.entity, data.item, data.amount)
end)
```

### `item_removed`
Kích hoạt khi xóa item khỏi inventory.

```lua
IA.AddEventListener("item_removed", function(data)
    print("Item removed:", data.entity, data.item, data.amount)
end)
```

## Movement Events

### `movement_started`
Kích hoạt khi bắt đầu di chuyển.

```lua
IA.AddEventListener("movement_started", function(data)
    print("Movement started:", data.entity, data.destination)
end)
```

### `movement_ended`
Kích hoạt khi kết thúc di chuyển.

```lua
IA.AddEventListener("movement_ended", function(data)
    print("Movement ended:", data.entity, data.position)
end)
```

## Best Practices

1. Đăng ký event listener với tên duy nhất
2. Xóa event listener khi không cần thiết
3. Xử lý dữ liệu event một cách an toàn
4. Tránh xử lý quá nhiều trong một event
5. Sử dụng event để tách biệt logic 