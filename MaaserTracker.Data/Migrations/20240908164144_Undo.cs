using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MaaserTracker.Data.Migrations
{
    /// <inheritdoc />
    public partial class Undo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SourceName",
                table: "Incomes",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SourceName",
                table: "Incomes");
        }
    }
}
