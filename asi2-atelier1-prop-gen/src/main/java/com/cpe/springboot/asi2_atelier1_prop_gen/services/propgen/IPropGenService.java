package com.cpe.springboot.asi2_atelier1_prop_gen.services.propgen;

import com.cpe.springboot.common.PropGenerationRequestDTO;
import com.cpe.springboot.common.PropGenerationValues;
import com.cpe.springboot.common.exceptions.MissingPropertyException;

public interface IPropGenService {
    PropGenerationValues generateProperties(PropGenerationRequestDTO req) throws MissingPropertyException;
}
