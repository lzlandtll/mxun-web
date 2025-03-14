export class RoleEnum {
    // 枚举值
    static readonly CHAT_AI = new RoleEnum("CHAT_AI", "AI角色");

    // 构造函数
    private constructor(
        public readonly roleCode: string,
        public readonly roleName: string
    ) {}

    // 可选：添加 toString 方法
    public toString(): string {
        return `RoleEnum{roleCode=${this.roleCode}, roleName=${this.roleName}}`;
    }
}
