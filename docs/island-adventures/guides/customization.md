---
sidebar_position: 3
---

# Tùy Chỉnh Giao Diện

Hướng dẫn về cách tùy chỉnh giao diện người dùng trong IslandAdventures.

## Cấu Trúc UI

### 1. Layout Cơ Bản

```lua
local basic_layout = {
    name = "basic_layout",
    position = "top_right",
    size = {width = 200, height = 300},
    elements = {
        {
            type = "container",
            style = {
                background = "panel",
                padding = 10,
                margin = 5
            },
            children = {
                {
                    type = "text",
                    content = "Thông tin đảo",
                    style = {
                        font = "header",
                        size = 18,
                        color = "white"
                    }
                },
                {
                    type = "text",
                    content = "Tên: {island_name}",
                    style = {
                        font = "body",
                        size = 14,
                        color = "light_gray"
                    }
                }
            }
        }
    }
}
```

### 2. Thêm Thanh Tiến Trình

```lua
local progress_bar = {
    type = "progress_bar",
    content = "Tiến độ khám phá",
    style = {
        width = 180,
        height = 20,
        background = "dark",
        fill_color = "blue",
        border_color = "white",
        border_width = 2
    },
    update = function(self, value)
        self.value = math.max(0, math.min(1, value))
    end
}
```

### 3. Tạo Menu Tùy Chỉnh

```lua
local custom_menu = {
    name = "island_menu",
    position = "center",
    size = {width = 400, height = 500},
    elements = {
        {
            type = "container",
            style = {
                background = "menu_background",
                padding = 20
            },
            children = {
                {
                    type = "text",
                    content = "Menu Đảo",
                    style = {
                        font = "title",
                        size = 24,
                        color = "white",
                        align = "center"
                    }
                },
                {
                    type = "button",
                    content = "Thông tin đảo",
                    style = {
                        width = 200,
                        height = 40,
                        background = "button_normal",
                        hover_background = "button_hover"
                    },
                    onClick = function()
                        show_island_info()
                    end
                },
                {
                    type = "button",
                    content = "Quản lý tài nguyên",
                    style = {
                        width = 200,
                        height = 40,
                        background = "button_normal",
                        hover_background = "button_hover"
                    },
                    onClick = function()
                        show_resource_management()
                    end
                }
            }
        }
    }
}
```

## Tùy Chỉnh Thông Tin

### 1. Hiển Thị Thông Tin Đảo

```lua
local island_info = {
    name = "island_info",
    position = "top_left",
    elements = {
        {
            type = "container",
            style = {
                background = "info_panel",
                padding = 10
            },
            children = {
                {
                    type = "text",
                    content = "Thông tin đảo",
                    style = {
                        font = "header",
                        size = 16
                    }
                },
                {
                    type = "grid",
                    columns = 2,
                    children = {
                        {
                            type = "text",
                            content = "Tên:",
                            style = {color = "gray"}
                        },
                        {
                            type = "text",
                            content = "{island_name}",
                            style = {color = "white"}
                        },
                        {
                            type = "text",
                            content = "Kích thước:",
                            style = {color = "gray"}
                        },
                        {
                            type = "text",
                            content = "{island_size}",
                            style = {color = "white"}
                        }
                    }
                }
            }
        }
    },
    update = function(self, data)
        self.elements[1].children[2].children[2].content = data.name
        self.elements[1].children[2].children[4].content = data.size
    end
}
```

### 2. Hiển Thị Tài Nguyên

```lua
local resource_display = {
    name = "resource_display",
    position = "bottom_right",
    elements = {
        {
            type = "container",
            style = {
                background = "resource_panel",
                padding = 10
            },
            children = {
                {
                    type = "text",
                    content = "Tài nguyên",
                    style = {
                        font = "header",
                        size = 16
                    }
                },
                {
                    type = "list",
                    style = {
                        spacing = 5
                    },
                    children = {
                        {
                            type = "resource_item",
                            content = "Gỗ: {wood_count}",
                            icon = "wood_icon"
                        },
                        {
                            type = "resource_item",
                            content = "Đá: {stone_count}",
                            icon = "stone_icon"
                        }
                    }
                }
            }
        }
    },
    update = function(self, data)
        self.elements[1].children[2].children[1].content = 
            string.format("Gỗ: %d", data.wood)
        self.elements[1].children[2].children[2].content = 
            string.format("Đá: %d", data.stone)
    end
}
```

## Tùy Chỉnh Thông Báo

### 1. Thông Báo Hệ Thống

```lua
local system_notification = {
    name = "system_notification",
    position = "top_center",
    style = {
        background = "notification_background",
        padding = 10,
        border_radius = 5,
        animation = "slide_down"
    },
    elements = {
        {
            type = "text",
            content = "{message}",
            style = {
                font = "body",
                size = 14,
                color = "white"
            }
        }
    },
    show = function(self, message)
        self.elements[1].content = message
        self.visible = true
        self.start_animation()
    end,
    hide = function(self)
        self.visible = false
        self.stop_animation()
    end
}
```

### 2. Thông Báo Nhiệm Vụ

```lua
local quest_notification = {
    name = "quest_notification",
    position = "right_center",
    style = {
        background = "quest_background",
        padding = 15,
        border_radius = 5,
        animation = "slide_left"
    },
    elements = {
        {
            type = "container",
            children = {
                {
                    type = "text",
                    content = "Nhiệm vụ mới",
                    style = {
                        font = "header",
                        size = 16,
                        color = "yellow"
                    }
                },
                {
                    type = "text",
                    content = "{quest_title}",
                    style = {
                        font = "body",
                        size = 14,
                        color = "white"
                    }
                },
                {
                    type = "text",
                    content = "{quest_description}",
                    style = {
                        font = "body",
                        size = 12,
                        color = "light_gray"
                    }
                }
            }
        }
    },
    show = function(self, quest_data)
        self.elements[1].children[2].content = quest_data.title
        self.elements[1].children[3].content = quest_data.description
        self.visible = true
        self.start_animation()
    end
}
```

## Tùy Chỉnh HUD

### 1. Thanh Sinh Tồn

```lua
local survival_hud = {
    name = "survival_hud",
    position = "bottom_left",
    elements = {
        {
            type = "container",
            style = {
                background = "hud_background",
                padding = 5
            },
            children = {
                {
                    type = "progress_bar",
                    content = "Sức khỏe",
                    style = {
                        width = 150,
                        height = 15,
                        fill_color = "red"
                    }
                },
                {
                    type = "progress_bar",
                    content = "Đói",
                    style = {
                        width = 150,
                        height = 15,
                        fill_color = "yellow"
                    }
                },
                {
                    type = "progress_bar",
                    content = "Tinh thần",
                    style = {
                        width = 150,
                        height = 15,
                        fill_color = "blue"
                    }
                }
            }
        }
    },
    update = function(self, data)
        self.elements[1].children[1].value = data.health / 100
        self.elements[1].children[2].value = data.hunger / 100
        self.elements[1].children[3].value = data.sanity / 100
    end
}
```

### 2. Mini Map

```lua
local mini_map = {
    name = "mini_map",
    position = "top_right",
    size = {width = 200, height = 200},
    elements = {
        {
            type = "container",
            style = {
                background = "map_background",
                border = "map_border"
            },
            children = {
                {
                    type = "map",
                    style = {
                        width = 180,
                        height = 180,
                        zoom = 0.5
                    }
                },
                {
                    type = "text",
                    content = "Bản đồ",
                    style = {
                        position = "top",
                        font = "small",
                        color = "white"
                    }
                }
            }
        }
    },
    update = function(self, data)
        self.elements[1].children[1].center = data.player_position
        self.elements[1].children[1].markers = data.map_markers
    end
}
```

## Tips và Tricks

### 1. Tối ưu hiệu suất

```lua
-- Sử dụng object pooling cho UI elements
local ui_pool = {
    pool = {},
    active = {},
    
    get = function(self, type)
        local element = table.remove(self.pool[type])
        if not element then
            element = self.create_element(type)
        end
        self.active[element.id] = element
        return element
    end,
    
    release = function(self, element)
        self.active[element.id] = nil
        table.insert(self.pool[element.type], element)
    end
}
```

### 2. Xử lý sự kiện

```lua
-- Hệ thống event handling cho UI
local ui_events = {
    handlers = {},
    
    register = function(self, event_type, handler)
        if not self.handlers[event_type] then
            self.handlers[event_type] = {}
        end
        table.insert(self.handlers[event_type], handler)
    end,
    
    trigger = function(self, event_type, data)
        if self.handlers[event_type] then
            for _, handler in ipairs(self.handlers[event_type]) do
                handler(data)
            end
        end
    end
}
```

### 3. Animation

```lua
-- Hệ thống animation cho UI
local ui_animation = {
    animations = {},
    
    create = function(self, element, type, duration)
        local animation = {
            element = element,
            type = type,
            duration = duration,
            start_time = os.time(),
            completed = false
        }
        
        table.insert(self.animations, animation)
        return animation
    end,
    
    update = function(self, dt)
        for i = #self.animations, 1, -1 do
            local animation = self.animations[i]
            local progress = (os.time() - animation.start_time) / animation.duration
            
            if progress >= 1 then
                animation.completed = true
                table.remove(self.animations, i)
            else
                self.update_animation(animation, progress)
            end
        end
    end
}
``` 