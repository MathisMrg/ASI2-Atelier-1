package com.cpe.springboot.common;


import com.cpe.springboot.common.exceptions.MissingPropertyException;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.util.Map;
import java.util.Objects;

@AllArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
public final class PropGenerationValues {
    private final float hp;
    private final float energy;
    private final float attack;
    private final float defence;

    private static String[] REQUIRED_PROP_KEYS = new String[] {
            "ATTACK",
            "DEFENCE",
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
        this.defence = values.get("DEFENCE");
        this.hp = values.get("HP");
        this.energy = values.get("ENERGY");
    }
}
