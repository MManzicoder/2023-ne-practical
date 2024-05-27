package rw.manzi.ne.supermarket.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import rw.manzi.ne.supermarket.enums.Eoperation;
import rw.manzi.ne.supermarket.utils.InitiatorAudit;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "quantities")
public class Quantity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

    @OneToOne
    private Product productCode;

    @Column
    private Double quantity;
    @Enumerated(EnumType.STRING)
    private Eoperation operation = Eoperation.IN;

    @Column
    private LocalDateTime date;

    public int hashCode() {
        return getClass().hashCode();
    }
}