package com.cpe.springboot.dto;


import lombok.Getter;

@Getter
public class AuthDTO {
	private String username;
	private String password;
	
	public AuthDTO() {
	}

    public void setUsername(String username) {
		this.username = username;
	}

    public void setPassword(String password) {
		this.password = password;
	}
	
}
