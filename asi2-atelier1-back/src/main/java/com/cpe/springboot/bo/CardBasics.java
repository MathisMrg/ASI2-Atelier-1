package com.cpe.springboot.bo;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@Getter
@MappedSuperclass
public class CardBasics {
	private String name;
	private String description;
	private String family;
	private String affinity;
	private String imgUrl;
	private String smallImgUrl;

	public CardBasics() {
		super();
	}

	public CardBasics(CardBasics c) {
		this(c.getName(), c.getDescription(), c.getFamily(), c.getAffinity(), c.getImgUrl(), c.getSmallImgUrl());
	}

	public CardBasics(String name, String description, String family, String affinity, String imgUrl,
			String smallImgUrl) {
		super();
		this.name = name;
		this.description = description;
		this.family = family;
		this.affinity = affinity;
		this.imgUrl = imgUrl;
		this.smallImgUrl = smallImgUrl;
	}

    public void setName(String name) {
		this.name = name;
	}

    public void setDescription(String description) {
		this.description = description;
	}

    public void setFamily(String family) {
		this.family = family;
	}

    public void setAffinity(String affinity) {
		this.affinity = affinity;
	}

    public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

    public void setSmallImgUrl(String smallImgUrl) {
		this.smallImgUrl = smallImgUrl;
	}

}
