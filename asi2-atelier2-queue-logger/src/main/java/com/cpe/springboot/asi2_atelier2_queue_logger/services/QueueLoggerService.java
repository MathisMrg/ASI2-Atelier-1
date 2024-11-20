package com.cpe.springboot.asi2_atelier2_queue_logger.services;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Service;

import com.cpe.springboot.IMessageLoggerDTO;

@Service
public class QueueLoggerService {

    private static final String LOG_FILE_PATH = "./logfile.txt";
    private static final Logger log = LoggerFactory.getLogger(QueueLoggerService.class);

    @JmsListener(destination = "logs", containerFactory = "jmsListenerContainerFactory")
    public void logTextgenMessage(IMessageLoggerDTO message) {
        // String queueLogEntry =  LocalDateTime.now() + " - Queue : propgen - "
        // + "Transaction ID: " + message.transaction_id() + " - " 
        // + "Callback URL: " + message.callbackUrl() + " - " 
        // + "Properties: " + message.prompt();
        String queueLogEntry = message.getProperties();
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(LOG_FILE_PATH,
                true))) {
            writer.write(queueLogEntry);
            writer.newLine();
            log.info("Logged message: {}", queueLogEntry);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
