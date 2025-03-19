 ---
sidebar_position: 4
---

# Networking

## Cơ Bản Về Networking

### Khởi Tạo Network Component
```lua
local function CreateNetworkedEntity()
    local inst = CreateEntity()
    
    -- Thêm network component
    inst.entity:AddNetwork()
    
    -- Đăng ký các biến cần đồng bộ
    if TheNet:IsDedicated() then
        inst.Network:SetFloat("health", 100)
        inst.Network:SetInt("level", 1)
        inst.Network:SetString("name", "Player")
    end
    
    return inst
end
```

### Xử Lý Network Events
```lua
local function SetupNetworkEvents(inst)
    -- Lắng nghe thay đổi giá trị
    inst:ListenForEvent("health_dirty", function(inst)
        local health = inst.Network:GetFloat("health")
        print("Health changed:", health)
    end)
    
    -- Lắng nghe thay đổi level
    inst:ListenForEvent("level_dirty", function(inst)
        local level = inst.Network:GetInt("level")
        print("Level changed:", level)
    end)
end
```

## RPC System

### Định Nghĩa RPC Types
```lua
local RPC_TYPES = {
    -- Combat
    ATTACK = "attack",
    TAKE_DAMAGE = "take_damage",
    HEAL = "heal",
    
    -- Inventory
    ADD_ITEM = "add_item",
    REMOVE_ITEM = "remove_item",
    USE_ITEM = "use_item",
    
    -- Movement
    MOVE_TO = "move_to",
    STOP_MOVING = "stop_moving",
    
    -- Custom
    CUSTOM_ACTION = "custom_action"
}
```

### Gửi RPC
```lua
local function SendRPCExample(inst)
    -- Gửi RPC với dữ liệu
    inst.Network:SendRPC(RPC_TYPES.ATTACK, {
        target = target_guid,
        damage = 20,
        weapon = "sword"
    })
    
    -- Gửi RPC không có dữ liệu
    inst.Network:SendRPC(RPC_TYPES.STOP_MOVING)
end
```

### Nhận RPC
```lua
local function HandleRPCExample(inst)
    -- Đăng ký RPC handler
    inst:ListenForEvent("custom_rpc", function(inst, data)
        if data.type == RPC_TYPES.ATTACK then
            -- Xử lý attack
            local target = Ents[data.target]
            if target then
                inst.components.combat:DoAttack(target, data.damage)
            end
        elseif data.type == RPC_TYPES.USE_ITEM then
            -- Xử lý use item
            local item = inst.components.inventory:GetItemByName(data.item)
            if item then
                item:Use()
            end
        end
    end)
end
```

## Đồng Bộ Dữ Liệu

### Đồng Bộ Component
```lua
local SyncComponent = Class(function(self, inst)
    self.inst = inst
    self.value = 0
    
    -- Đăng ký network variables
    if TheNet:IsDedicated() then
        self.inst.Network:SetFloat("value", self.value)
    end
    
    -- Lắng nghe thay đổi
    if not TheNet:IsDedicated() then
        self.inst:ListenForEvent("value_dirty", function(inst)
            self:OnValueChanged()
        end)
    end
end)

-- Cập nhật giá trị
function SyncComponent:SetValue(value)
    self.value = value
    if TheNet:IsDedicated() then
        self.inst.Network:SetFloat("value", value)
    end
end

-- Xử lý thay đổi
function SyncComponent:OnValueChanged()
    local value = self.inst.Network:GetFloat("value")
    self:UpdateVisuals(value)
end
```

### Đồng Bộ Inventory
```lua
local function SyncInventory(inst)
    -- Đăng ký inventory sync
    if TheNet:IsDedicated() then
        inst:AddComponent("inventory")
        inst.components.inventory:SetMaxSlots(15)
        
        -- Lắng nghe thay đổi inventory
        inst:ListenForEvent("itemget", function(inst, data)
            inst.Network:SendRPC(RPC_TYPES.ADD_ITEM, {
                item = data.item.prefab,
                slot = data.slot
            })
        end)
        
        inst:ListenForEvent("itemlose", function(inst, data)
            inst.Network:SendRPC(RPC_TYPES.REMOVE_ITEM, {
                slot = data.slot
            })
        end)
    end
end
```

## Best Practices

1. Luôn kiểm tra TheNet:IsDedicated() trước khi gửi RPC
2. Sử dụng network variables cho dữ liệu cần đồng bộ liên tục
3. Sử dụng RPC cho các hành động quan trọng
4. Xử lý lỗi khi gửi/nhận RPC
5. Tối ưu hóa số lượng network events
6. Sử dụng compression cho dữ liệu lớn
7. Validate dữ liệu trước khi xử lý
8. Thêm timeout cho các network operations
9. Log network errors để debug
10. Test networking trong môi trường multiplayer