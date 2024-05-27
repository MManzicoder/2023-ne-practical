package rw.manzi.ne.supermarket.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import rw.manzi.ne.supermarket.fileHandling.File;
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
@Table(name = "products")
public class Product extends InitiatorAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "code")
    private UUID code;
    @Column
    private String name;
    @Column(name = "product_type")
    private String productType;
    @Column
    private Double price;
    @Column(name= "in_date")
    private LocalDateTime inDate;

    @ManyToOne
    @JsonIgnore
    private Quantity quantity;
    @OneToOne
    private File image;



    public int hashCode() {
        return getClass().hashCode();
    }
}