package br.com.avaliacao.backend.repositories;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.avaliacao.backend.entities.Exame;
import br.com.avaliacao.backend.entities.Funcionario;

public interface ExameRepository extends PagingAndSortingRepository<Exame, Integer>{
	/*public Exame findByfuncionarioCodigo(Integer id);
	public Exame findByNomeExameIgnoreCase(String parteNome);
	public Exame findByData(LocalDate data);*/
	public Exame findByCodigo(Integer codigo);
}
