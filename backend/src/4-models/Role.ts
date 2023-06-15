class Role {
  public user: string;
  public admin: string;

  public constructor(user: string, admin: string) {
    this.user = user;
    this.admin = admin;
  }
}

export default Role;
