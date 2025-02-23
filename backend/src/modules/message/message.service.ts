import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { MessageRepo } from './message.repo';
import { Types } from 'mongoose';
import { CloudinaryService } from 'src/core/cloudinary/cloudinary.service';

@Injectable()
export class MessageService {

  constructor(private readonly userServices: UserService,
    private readonly messageRepo: MessageRepo, private readonly cloudinaryService: CloudinaryService) { }

  async getMessagesHistory(user_id: string, _id: string) {

    // PLEASE NOTE: we take take the service not the controller 
    // MEANS: we allow the internal service to communicate while the external requests can not 

    return await this.messageRepo.find({
      $or: [
        { senderId: _id, receiverId: user_id },
        { senderId: user_id, receiverId: _id }
      ]
    })
  }


  async findAllUserForSidebar(_id: string) {
    return await this.userServices.findAllExcept(_id);
  }

  async sendMessage(imageBase64: string, text: string, senderId: Types.ObjectId, receiverId: Types.ObjectId) {


    const res = await this.cloudinaryService.uploadChatImg(imageBase64, String(senderId), String(receiverId))


    const newMessage = await this.messageRepo.create({
      text: text,
      senderId,
      receiverId,
      image: res
    });


    return newMessage;
  }
}

