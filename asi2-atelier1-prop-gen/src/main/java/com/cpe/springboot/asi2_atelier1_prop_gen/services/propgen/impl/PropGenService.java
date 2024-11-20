package com.cpe.springboot.asi2_atelier1_prop_gen.services.propgen.impl;

import com.cpe.springboot.asi2_atelier1_prop_gen.services.propgen.IPropGenService;
import com.cpe.springboot.common.PropGenerationRequestDTO;
import com.cpe.springboot.common.PropGenerationValues;
import com.cpe.springboot.common.exceptions.MissingPropertyException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tp.cpe.ImgToProperties;

import java.util.Map;


@Service
@Slf4j
public class PropGenService implements IPropGenService {
    @Override
    public PropGenerationValues generateProperties(PropGenerationRequestDTO req) throws MissingPropertyException {
      log.info("Generating properties from image: {}", req.imgUrl());
        Map<String, Float> result = ImgToProperties.getPropertiesFromImg(req.imgUrl(),
                100f,
                4,
                0.3f, false
        );

        return new PropGenerationValues(result);
    }

}
