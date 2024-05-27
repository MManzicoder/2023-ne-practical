package rw.manzi.ne.supermarket.models;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import rw.manzi.ne.supermarket.utils.InitiatorAudit;

import javax.persistence.*;
import java.time.LocalDateTime;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "purchased_products")
public class Purchased extends InitiatorAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private UUID id;

   @OneToOne
   @JoinColumn(name = "code")
   private Product productCode;

    private Double quantity;

   @Column
   private Double total;

    @Column
    private LocalDateTime date;
    @ManyToOne
    private User user;


    public int hashCode() {
        return getClass().hashCode();
    }
}