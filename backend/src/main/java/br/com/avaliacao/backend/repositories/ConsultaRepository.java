package br.com.avaliacao.backend.repositories;

import java.time.LocalDate;
import java.util.Date;

import org.springframework.data.repository.PagingAndSortingRepository;

import br.com.avaliacao.backend.entities.Consultas;

public interface ConsultaRepository extends PagingAndSortingRepository<Consultas, Integer>{
	public Consultas findByFuncionarioCodigo(Integer codigo);
	public Consultas findByExameCodigo(Integer codigo);
	public Consultas findByData(LocalDate data);
	public Consultas findByFuncionario(String nome);
	public Consultas findByExame(String exameNome);
	
}
