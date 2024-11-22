import { Module } from '@nestjs/common';
import { IaService } from './ia.service';
import { IaController } from './ia.controller';
import { HttpModule } from '@nestjs/axios';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [HttpModule],
  providers: [IaService, FirebaseService],
  controllers: [IaController],
})
export class IaModule {}
