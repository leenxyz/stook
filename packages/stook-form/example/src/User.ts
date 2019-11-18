import { Contains, Length, IsEmail, IsBoolean, IsNotEmpty } from 'class-validator'

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))


export class Profile {
  @Length(10, 20)
  username: string = 'pname'
}

export class User {
  pofile: Profile = {
    username: 'pp name',
  }

  @IsEmail()
  @Length(10, 20)
  email = 'qqcom'

  @Length(10, 20)
  password: string = '123456'

  @IsNotEmpty()
  confirm = ''

  nickname = ''

  @Length(11)
  phone = 87

  drone = 'dewey'

  age = 10

  checks = ['horns']

  @IsBoolean()
  removed = false

  @Contains('hello')
  desc: string = 'desc..'
}
