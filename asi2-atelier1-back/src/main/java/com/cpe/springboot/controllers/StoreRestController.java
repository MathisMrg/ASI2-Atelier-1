package com.cpe.springboot.controllers;

import com.cpe.springboot.dto.CardDTO;
import com.cpe.springboot.services.StoreService;
import com.cpe.springboot.dto.StoreOrder;
import com.cpe.springboot.bo.StoreTransaction;

import java.util.List;

import org.springframework.web.bind.annotation.*;

//ONLY FOR TEST NEED ALSO TO ALLOW CROOS ORIGIN ON WEB BROWSER SIDE
@CrossOrigin
@RestController
@RequestMapping(value="/store")
public class StoreRestController {

	private final StoreService storeService;

	public StoreRestController(StoreService storeService) {
		this.storeService = storeService;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/buy")
	private boolean buyCards(@RequestBody StoreOrder order) {
		return storeService.buyCardInternal(order.getUser_id(), order.getCard_id());
	}

	@RequestMapping(method = RequestMethod.POST, value = "/buy/btob")
	private boolean buyCardBtoB(@RequestBody StoreOrder order) {
		return storeService.buyCardBtob(order.getUser_id(), order.getCard_id(),order.getStore_id());
	}

	@RequestMapping(method = RequestMethod.POST, value = "/sell")
	private boolean sellCard(@RequestBody StoreOrder order) {
		return storeService.sellCardInternal(order.getUser_id(), order.getCard_id());
	}

	@RequestMapping(method = RequestMethod.GET, value = "/transaction")
	private List<StoreTransaction> getTransaction() {
		return storeService.getAllTransactions();
	}


	@RequestMapping(method=RequestMethod.GET, value="/cards_to_sell")
	private List<CardDTO> getCardsToSell() {
		return storeService.listCardToSell();
	}

	@RequestMapping(method=RequestMethod.GET, value="/cards_to_sell/btob")
	private List<CardDTO> getCardsToSellBToB() {
		return storeService.listCardToSellBtob();
	}

}
