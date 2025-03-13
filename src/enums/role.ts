export class RoleEnum {
    // 枚举值
    static readonly CHAT_AI = new RoleEnum(1, "AI角色");

    // 构造函数
    private constructor(
        public readonly roleId: number,
        public readonly roleName: string
    ) {}

    // 可选：添加 toString 方法
    public toString(): string {
        return `RoleEnum{roleId=${this.roleId}, roleName=${this.roleName}}`;
    }
}
