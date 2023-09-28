export class CreateUserDto {
    uname: string;
    readonly email: string;
    password: string;
    encryptPassword(hashedPassword: string): void {
        this.password = hashedPassword;
    }
}
