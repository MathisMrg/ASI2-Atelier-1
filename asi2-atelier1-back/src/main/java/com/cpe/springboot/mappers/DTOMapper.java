package com.cpe.springboot.mappers;
import com.cpe.springboot.dto.CardDTO;
import com.cpe.springboot.bo.CardModel;
import com.cpe.springboot.dto.GenerateCardDTO;
import com.cpe.springboot.dto.UserDTO;
import com.cpe.springboot.bo.UserModel;

public class DTOMapper {
	
	public static CardDTO fromCardModelToCardDTO(CardModel cM) {
		CardDTO cDto =new CardDTO(cM);
		return cDto;
	}
	
	public static CardModel fromCardDtoToCardModel(CardDTO cD) {
		CardModel cm=new CardModel(cD);
		cm.setEnergy(cD.getEnergy());
		cm.setHp(cD.getHp());
		cm.setDefence(cD.getDefence());
		cm.setAttack(cD.getAttack());
		cm.setPrice(cD.getPrice());
		cm.setId(cD.getId());
		return cm;
	}
	
	
	public static UserDTO fromUserModelToUserDTO(UserModel uM) {
		UserDTO uDto =new UserDTO(uM);
		return uDto;
	}


	public static CardModel fromGenerateCardDTOToCardModel(GenerateCardDTO gC) {
		CardModel cm=new CardModel();
		return cm;
	}
	
}
