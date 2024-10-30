package com.cpe.springboot.common;


import com.cpe.springboot.common.exceptions.MissingPropertyException;
import lombok.*;

import java.util.Map;
import java.util.Objects;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public final class PropGenerationValues {
    private float hp;
    private float energy;
    private float attack;
    private float defence;

    private static String[] REQUIRED_PROP_KEYS = new String[] {
            "ATTACK",
            "DEFENSE",
            "HP",
            "ENERGY"
    };

    public PropGenerationValues(Map<String, Float> values) throws MissingPropertyException {
        for (String key : REQUIRED_PROP_KEYS) {
            if (!values.containsKey(key)) {
                throw new MissingPropertyException("Property " + key + "missing from generated properties");
            }
        }

        this.attack = values.get("ATTACK");
        this.defence = values.get("DEFENSE");
        this.hp = values.get("HP");
        this.energy = values.get("ENERGY");
    }
}
