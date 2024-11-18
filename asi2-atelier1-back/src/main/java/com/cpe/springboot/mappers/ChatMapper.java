package com.cpe.springboot.mappers;

import com.cpe.springboot.bo.ChatHistory;
import com.cpe.springboot.bo.UserModel;
import com.cpe.springboot.dto.ChatDTO;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ChatMapper {

    public static ChatHistory fromChatDtoToChatModel(ChatDTO cD) {
        ChatHistory cm = new ChatHistory();
        cm.setMessage(cD.getMessage());
        cm.setSentAt(cD.getSentAt());
        if (cD.getReceiverId()!=null) {
            cm.setReceiver(new UserModel(cD.getReceiverId()));
        }
        cm.setSender(new UserModel(cD.getSenderId()));
        return cm;
    }

    public static ChatDTO fromChatModelToChatDto(ChatHistory cH) {
        ChatDTO cd = new ChatDTO();
        cd.setMessage(cH.getMessage());
        cd.setSentAt(cH.getSentAt());
        if (cH.getReceiver() !=null) {
            cd.setReceiverId(cH.getReceiver().getId());
        }
        cd.setSenderId(cH.getSender().getId());
        return cd;
    }
}
