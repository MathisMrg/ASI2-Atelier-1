package com.cpe.springboot.asi2_atelier1_prop_gen.listeners;

import com.cpe.springboot.asi2_atelier1_prop_gen.clientresponse.IPropGenClientResponseService;
import com.cpe.springboot.asi2_atelier1_prop_gen.services.propgen.IPropGenService;
import com.cpe.springboot.common.PropGenerationRequestDTO;
import com.cpe.springboot.common.PropGenerationResponseDTO;
import com.cpe.springboot.common.PropGenerationValues;
import com.cpe.springboot.common.exceptions.MissingPropertyException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ActiveMQListener {

    private final IPropGenClientResponseService clientResponseService;
    private final IPropGenService propGenService;

    public ActiveMQListener(IPropGenService propGenService, IPropGenClientResponseService clientResponseService) {
        this.propGenService = propGenService;
        this.clientResponseService = clientResponseService;
    }

    @JmsListener(destination = "propgen")
    public void listenForAmqRequest(PropGenerationRequestDTO req) {
        log.info("received request : {}", req);
        try {
            clientResponseService.sendResponse(
                    propertiesToPropGenerationResponseDTO(req, propGenService.generateProperties(req)),
                    req.callbackUrl()
            );
        } catch (MissingPropertyException e) {
            log.error("error while mapping request result to properties : {}", e.getMessage());
            clientResponseService.sendResponse(
                    exceptionToPropGenerationResponseDTO(req, e),
                    req.callbackUrl()
            );
        }
    }

    private PropGenerationResponseDTO exceptionToPropGenerationResponseDTO(PropGenerationRequestDTO req, Exception e) {
        return new PropGenerationResponseDTO(
                req.transactionId(),
                false,
                e.getMessage(),
                null
        );
    }

    private PropGenerationResponseDTO propertiesToPropGenerationResponseDTO(PropGenerationRequestDTO req, PropGenerationValues propGenerationValues) {
        return new PropGenerationResponseDTO(
                req.transactionId(),
                true,
                "",
                propGenerationValues
        );
    }
}
