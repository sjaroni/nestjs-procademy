import { Controller, Get } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private ProfileService: ProfileService) {}

  @Get()
  getProfiles() {
    return this.ProfileService.getAllProfiles();
  }
}
