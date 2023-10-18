export class CreateUserDto {
    uname: string;
    readonly email: string;
    password: string;
    readonly radioOption: string;
    encryptPassword(hashedPassword: string): void {
        this.password = hashedPassword;
    }
}
