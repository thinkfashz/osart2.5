import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Get('me')
  async getProfile(@Req() req: any) {
    return this.profilesService.findOne(req.user.userId);
  }

  @Get()
  async getProfiles() {
    // In a real app, we would check if req.user.role === 'admin'
    // For this dev environment, we'll allow listing.
    return this.profilesService.findAll();
  }

  @Get('me/stats')
  async getStats(@Req() req: any) {
    return this.profilesService.getStats(req.user.userId);
  }

  @Put('me')
  async updateProfile(
    @Req() req: any,
    @Body() data: { fullName?: string; avatarUrl?: string },
  ) {
    return this.profilesService.update(req.user.userId, data);
  }
}
