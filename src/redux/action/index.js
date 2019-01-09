/**
 * Action 类型：用户事件操作
 */

export const type = {
    SWITCH_MENU : 'SWITCH_MENU'
}

// 菜单点击切换，修改面包屑名称
export function switchMenu(menuName) {
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}